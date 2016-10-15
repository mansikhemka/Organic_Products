/**
 * Created by mansikhemka on 10/10/16.
 */


$(function(){

    showcart();





    $('#inserthere').on('click','.minus',(ev)=> {
        // console.log($('.minus'))
        console.log(ev.currentTarget.value)
        // var konsaminus = $(this).parent().parent().attr('id');
        var konsaminus = ev.currentTarget.value;                                                                    //change back
        console.log(konsaminus)
        var cart = localStorage.getItem('cart');
        cart = JSON.parse(cart);
        if(cart[konsaminus].quantity==1){
            return
        }
        cart[konsaminus].quantity = cart[konsaminus].quantity - 1;
        cart[konsaminus].amount = cart[konsaminus].amount - cart[konsaminus].price;
        localStorage.setItem('cart', JSON.stringify(cart));
        showcart();

    })






    // $('.hey').on('click','.items',()=>{
    $('.hey').on('click','.items',(ev)=>{
        // $('.hey').on('click', "[id^=item_]", function(){
        console.log(ev.currentTarget.value)
        console.log($(this).val())
        // var curr = $(event.target).next();
        // console.log(curr);
        // savecart($(ev.currentTarget).next().html());
        // savecart($(this).parent().data('val'))                                   //dom element cannot be fetched
        savecart(ev.currentTarget.value);                                                          //parameter not working

    })



    $('#inserthere').on('click','.cross',(ev)=> {
        // var getr = $(this).parent().parent().attr('id');
        var getr =ev.currentTarget.value;;                                                                     //change back
        var cart = JSON.parse(localStorage.getItem('cart'));
        cart.splice(getr, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        showcart();
    })





    $('#inserthere').on('click','.plus',(ev)=> {
        // var konsaplus = $(this).parent().parent().attr('id');
        var konsaplus =ev.currentTarget.value;;                                                                    //change back
        var cart = localStorage.getItem('cart');
        cart = JSON.parse(cart);
        console.log(cart[konsaplus].quantity);
        cart[konsaplus].quantity = cart[konsaplus].quantity + 1;
        cart[konsaplus].amount = cart[konsaplus].amount + cart[konsaplus].price;
        localStorage.setItem('cart', JSON.stringify(cart));
        showcart();
 })


})


















function savecart(dish){

    var p=0;
    var cart = localStorage.getItem('cart');
    $.post('/requisite',{dish: dish},(result)=>{
        // console.log(result[0]. price);                              //price is being fetched from db and being logged
         p=result[0].price                                                            //NW....shows p of type undefined;
        console.log(p)
        if(!cart){
            cart = [];
        }
        else{
            cart = JSON.parse(cart);
        }
        cart.push({dish: dish, price:p, quantity: 1, amount:p});                             //change back to p
        localStorage.setItem('cart', JSON.stringify(cart));
        // console.log(localStorage.getItem('cart'));
        showcart();



    })





}







function showcart(){
    var cart = localStorage.getItem('cart');
    if(!cart){
        return
    }
    console.log(cart);
    cart = JSON.parse(cart);
    // console.log(cart);
     var list="<table><tr><td>S NO.</td><td>PRODUCT</td><td>PRICE</td><td>QUANTITY</td><td>AMOUNT</td></tr>";
     var total = 0;
    for(var i=0;i<cart.length;i++){
        // console.log(cart[i].dish)
        var item;
        item ="<tr id='"+i+"'>"+
            "<td>"+i+"</td>"+
        "<td>"+cart[i].dish+"</td>"+
        "<td>"+cart[i]. price+"</td>"+
        "<td><button class='minus' value='"+i+"'>-</button><span>"+cart[i].quantity+"</span><button class='plus' id='p"+i+"' value='"+i+"'>+</button></td>"+
        "<td><button class='cross' id='c"+i+"' value='"+i+"'>x</button>"+cart[i].amount+"</td>"
        +"</tr>";
        total = total + cart[i].amount;
        list=list+item;
    }
    list=list+"</table><center><p style='width: 100%;color:snow;background-color:black; opacity: 0.78; padding-top: 10px;padding-bottom: 10px;'>TOTAL AMOUNT IS "+total+"</p></center>";
    $('#inserthere').html(list);



    $.get('/itemfetch',function(data){
        console.log(data);

        var l="";
        for(var i=0;i<data.length;i++){
            var k;
            k=' <div  value="'+ data[i].sno+'"> <button class="items" value="'+ data[i].sno+'"><span style="display:none">'+ data[i].id+'</span><span class="glyphicon glyphicon-leaf"></span><p>'+ data[i].sno+'</p><p>Rs'+ data[i].price+'/</p></button></div>';


            l=l+k;
        }
        $('.hey').html(l);
    })

}








