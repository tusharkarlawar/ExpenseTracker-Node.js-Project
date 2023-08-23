const Razorpay = require('razorpay');
const Order = require('../models/orders')

// const purchasepremium = async (req, res) => {
    exports.purchasepremium = async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: 'rzp_test_U4GoLgww0w8Ish',
            key_secret: 'pOPWl4gPZFDz9mKlWz2Ct6j5'
        });
        const amount = 2500;

        rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
                await req.user.createOrder({ orderid: order.id, status: 'PENDING' }).then(()=>{
                return res.status(201).json({ order, key_id: 'rzp_test_U4GoLgww0w8Ish' });
            }).catch(err => {
                throw new Error(orderErr);
            })
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err.message });
    }
};

exports.updateTransactionstatus = async(req,res) => {
    try{
        const {payment_id,order_id} = req.body;
        const order = await Order.findOne({where: {orderid: order_id}})
        const promise1 = order.update({paymentid: payment_id, status: 'SUCCESSFUL'})
        const promise2 = req.user.update({ispremiumuser: true})

        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({sucess: true,message: "Transaction Successful"});
        }).catch((error) => {
            throw new Error(console.error);
        })
    }
    catch(err){
        console.log(err);
        res.status(403).json({error: err, message: 'Something went wrong'})
    }
}
