import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import './PlansScreen.css'
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                });
            });
        });
    }, [user.uid]);

    useEffect(() => {
        db.collection("products")
        .where("active", "==", true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async productDoc =>{
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection
                ("prices").get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    };
                });
            });
            setProducts(products);
        });
        
    }, []);
    console.log(products);
    console.log(subscription);

    const loadCheckout = async (priceId) => {
        const docRef = await db
        .collection("customers")
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url:  window.location.origin,
        });
        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data();
            if(error) {
                // Show error to your customer and
                // inspect your cloud funtion logs in Firebase console
                alert(`An error occured: ${error.message}`);
            }

            if(sessionId) {
                // We have a session, let's redirect to checkout
                // Init Stripe

                const stripe = await loadStripe('pk_test_51MZFJzSFp03FC22GffKAXGcg4U3Z4fMyI56otrHqbPvTtLvL9g3FF7jwBhS73Nqs0L5zOySNB7TXzOCr4VUELM5c00dIE7EqLI');
                stripe.redirectToCheckout({sessionId});
            }
        })
    }

    return <div className="plansScreen">
        <br/> 
        {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
        {Object.entries(products).map(([productId, productData]) => {
            //Todos
            const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
            return (
                <div 
                key={productId} 
                className={`${
                    isCurrentPackage && "plansScreen_plan--disabled"
                    } plansScreen_plan`}
                >
                <div className="plansScreen_info">
                    <h5>{productData.name}</h5>
                    <h6>{productData.description}</h6>
                </div>
                <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                    {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                </button>
                </div>
            );
        })}
    </div>
}

export default PlansScreen;