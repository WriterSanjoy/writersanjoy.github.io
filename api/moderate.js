```js
export default async function handler(req,res){

  const adminPassword =
    req.headers['x-admin-password'];

  if(
    adminPassword !== process.env.ADMIN_PASSWORD
  ){
    return res.status(401).json({
      success:false,
      message:'Unauthorized'
    });
  }

  return res.status(200).json({
    success:true,
    message:'Authorized'
  });
}
```
