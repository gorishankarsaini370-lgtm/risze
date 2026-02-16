// Node.js Express Example
app.post("/api/recharge", async (req,res)=>{
    const {mobile, operator, amount, benefits} = req.body;

    // 1️⃣ Recharge API Call to Payment Gateway
    let rechargeResponse = await RechargeAPI.recharge({mobile, operator, amount});
    
    if(rechargeResponse.status === "success") {
        // 2️⃣ Send SMS to User
        SMSAPI.send({
            to: mobile,
            message: आपका ₹${amount} का ${operator} रिचार्ज सक्सेसफुल है। Benfits: ${benefits}
        });

        res.json({status:"success"});
    } else {
        res.json({status:"failed"});
    }
});