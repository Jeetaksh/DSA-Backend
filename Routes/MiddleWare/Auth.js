const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function Auth(req, res, next) {
    try{
    const clerkUserId = req.header('clerkUserId');
    if (!clerkUserId) {
        console.log("issue")
        throw Error("clerkid not found")

        
    }
    else{
  const user=  await prisma.user.findUnique({
    where:{
        clerkUserId:clerkUserId
    }
  })
  if(!user){
throw Error("usr not found")
  }

  req.user = user;
  next();

    }
    }catch(e){
        console.log("error");
 return res.json({
    message:"not auth"
})

    }

    // Proceed with your authentication logic
};


module.exports = Auth