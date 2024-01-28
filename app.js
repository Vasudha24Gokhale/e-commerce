const express=require('express');
const app=express();
const con=require('./connection');
const bodyParser= require('body-parser');
const session=require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port=3030;
// session setup start
app.use(session({
    secret:'12345',
    resave:true,
    saveUninitialized:true

}))
// session end
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.static('uploads'));
app.get('/',(req,res)=>{
    res.render("index");
});
app.get('/login',(req,res)=>{
    res.render("login");
});
app.get('/checkoutpage',(req,res)=>{
    res.render("checkoutpage");
});
app.get('/ourproduct',(req,res)=>{
    con.query("select * from tbl_products",(error,result)=>{
        if(result.length>0)
        {
            res.render("ourproduct",{data:result});
        }
        else
        {
            throw error;
        }
    })
    
});
app.get('/buynow',(req,res)=>{
    res.render("buynow");
});
app.get('/buynow2',(req,res)=>{
    res.render("buynow2");
});
app.get('/buynow3',(req,res)=>{
    res.render("buynow3");
});
app.get('/buynow4',(req,res)=>{
    res.render("buynow4");
});
app.get('/buynow5',(req,res)=>{
    res.render("buynow5");
});
app.get('/buynow6',(req,res)=>{
    res.render("buynow6");
});
app.get('/buynow7',(req,res)=>{
    res.render("buynow7");
});
app.get('/buynow8',(req,res)=>{
    res.render("buynow8");
});
app.get('/buynow9',(req,res)=>{
    res.render("buynow9");
});
app.get('/cartpage',(req,res)=>{
    res.render("cartpage");
});
app.get('/contactus',(req,res)=>{
    res.render("contactus");

})
app.get('/return',(req,res)=>{
    res.render("return");

})
app.get('/review',(req,res)=>{
    res.render("review");

});
app.get('/affiliate',(req,res)=>{
    res.render("affiliate");

});
app.get('/dashboard',(req,res)=>{
   // res.render("./adminZone/dashboard");
   if(req.session.email!=null)
   {
    res.render("./adminZone/dashboard");
   }
   else{
    res.end("<script>alert('first login then go to next zone');window.location.href='/login'</script>")
   }
});
app.get('/add_products',(req,res)=>{
    res.render("./adminZone/add_products");
});
app.get('/admin_Zone',(req,res)=>{
    res.render("./adminZone/admin_zone");
});
app.get('/affiliate_member',(req,res)=>{
    con.query("select * from tbl_amember",(error,result)=>{
        if(result.length>0){
        res.render('adminzone/affiliate_member',{title:'Affiliate Member Management',data:result});
        
        }
        else{
            throw error;
        }
     })
});
app.get('/contact_management',(req,res)=>{
    con.query("select * from tbl_contact",(error,result)=>{
        if(result.length > 0){
        res.render('adminzone/contact_management',{title:'contact Management',data:result});
        
        }
        else{
            throw error;
        }
     })
});
app.get('/logout',(req,res)=>{
   // res.render("./adminZone/logout");
   req.session.destroy();
   res.end("<script>alert('logout');window.location.href='/login'</script>")
});
app.get('/manage_password',(req,res)=>{
    // res.render("./adminZone/manage_password");
    con.query("select * from tbl_password",(error,result)=>{
        if(result.length>0){
        res.render('adminzone/manage_password',{title:'signup',data:result});
        
        }
        else{
            throw error;
        }
     })
});
app.get('/order_product_management',(req,res)=>{
    res.render("./adminZone/order_product_management");
});
app.get('/product_management',(req,res)=>{
    con.query("select * from tbl_proucts",(error,result)=>{
        if(result.length>0){
        res.render('adminzone/product_management',{title:' product Management',data:result});
        
        }
        else{
            throw error;
        }
     })
});
app.get('/return_product',(req,res)=>{
    con.query("select * from tbl_return",(error,result)=>{
        if(result.length>0){
        res.render('adminzone/return_product',{title:' return product',data:result});
        
        }
        else{
            throw error;
        }
     })
});
//login and sign up
//password management
app.post('/signup',(req,res)=>{
    var uname,email,passwd;
    uname=req.body.uname;
    email=req.body.email;
    passwd=req.body.passwd;
    
   
   con.query('insert into tbl_password(uname,email,passwd) values(?, ?, ?)',[uname,email,passwd,],(error,result)=>{
             if(error)
             {
                   throw error;
             }
             else
             {
                   res.end("<script>alert('Thanks for sign up Now you can login ');window.location.href='/'</script>");
             }
       });
   })
   // end here password
   //log in start here
   
   app.post('/login',(req,res)=>{
        var email=req.body.email;
        var passwd=req.body.passwd;
   
        // match textbox value 
        con.query("select * from tbl_password where email= ? and  passwd= ? ",[email,passwd] ,(error,result,fields)=>{
           if(result.length>0)
           {
            req.session.email=email;
            
               res.end("<script>alert('Welcome to login'); window.location.href='/dashboard'</script>");
              //res.redirect('./AdminZone/dashboard');
           }
           else
           {
               res.end("<script>alert('Invalid Userid or Poassword'); window.location.href='/login'</script>");
               //res.redirect('/login');
           }
           res.end();
   
        });
        
   
   
   });
   
   // log in end here
// return product post
app.post('/return_pro',(req,res)=>{
    var pid, email, pissue,comment;
    pid=req.body.pid;
    email=req.body.email;
    pissue=req.body.pissue;
    comment=req.body.comment;
    con.query('insert into tbl_return(pid,email,pissue,comment) values(?, ?, ?, ?)',[pid,email,pissue,comment],(error,result)=>{
        if(error) throw error;
    else{
        res.end("<script>alert('Thank you for contact we will contact you soon');window.location.href='/' </script>  ");
    }
    });
});
//contac us post ==
app.post('/contact',(req,res)=>{
    var name,email,mobile
    name=req.body.name;
    email=req.body.email;
    mobile=req.body.mobile;
    con.query('insert into tbl_contact(name,email,mobile) values(?, ?, ?)',[name,email,mobile],(error,result)=>{
        if(error) throw error;
    else{
        res.end("<script>alert('Thank you for contact we will contact you soon');window.location.href='/' </script>  ");
    }
    });


});
// ============subscribe=======================
app.post('/subscribe',(req,res)=>{
    var Email;
    Email=req.body.email;
    con.query('insert into subscribe(email) values(?)',[Email],(error,result)=>{
            if(error){
                throw error;

            }
            else{
                res.end("<script> alert ('submitted on databse ');window.location.href='/ '   </script>");
            }
    } );

});
// =====================post action start from here =================
app.post('/members',(req,res)=>{
    //get values from form 
    var name,email,passwd,address;
    name=req.body.name;
    email=req.body.email;
    password=req.body.password;
    addr=req.body.addr;

    con.query('insert into tbl_amember(name,email,password,addr) values(?, ?, ?, ?)',[name,email,password,addr],(error,result)=>{

        if(error){
            throw error;
        }
        else{
            res.end("<script>alert('thanks for become a member as a soon as we contact you ');window.location.href='/affiliate'</script>");
    
        }
    
     });

 
});
// end here
//multer
var multer= require('multer');
const connection = require('./connection');
var fname=" ";
var storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./uploads');
    },
    filename:function(req,file,callback){
        callback(null,file.originalname);
        fname=file.originalname
    }
});
var upload = multer({storage:storage}).single('ppic');
// add products 
app.post('/aproducts',(req,res)=>{
 
    upload(req,res,function(err){
        var pname,price,ppic,pcat,pdesc;
        pname=req.body.pname;
        price=req.body.price;
        ppic=fname;
        pcat=req.body.pcat;
        pdesc=req.body.pdesc;
        if(err)  throw err;
        
          else{    // res.end("file is upload successfully!"+fname);
        con.query("insert into tbl_products(pname,price,ppic,pcat,pdesc) values(?, ?, ?, ?, ?)",[pname,price,ppic,pcat,pdesc],(error,result)=>{
            if(error) throw error;
            else
            res.end("<script>alert('product added into databse ');window.location.href='/add_products'</script>");
        })
    }
});


    

});
//product add end here



var images = multer({storage:storage}).single('pic');
// review
app.post('/review',(req,res)=>{
 
    images(req,res,function(err){
        var name,pic,star;
        name=req.body.name;
        pic=fname;
        star=req.body.star;
         if(err)  throw err;
        
          else{    // res.end("file is upload successfully!"+fname);
        con.query("insert into tbl_review(name,pic,star,) values(?, ?, ?, )",[name,pic,star],(error,result)=>{
            if(error) throw error;
            else
            res.end("<script>alert('review added into databse ');window.location.href='/review'</script>");
        })
    }
});


    

});
//display affiliate member 

// end here 
 
app.listen(port,(error)=>{
    if(error) throw error;
    else
    console.log('server is connected on port %d ',port);
    console.log('click here open http://localhost:%d ',port);
});