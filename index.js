document.getElementById('forms').addEventListener('submit', addProduct);
window.addEventListener("DOMContentLoaded", ()=>{
 axios.get("https://crudcrud.com/api/9f4f2d0ea4cd4c928c6b95a77524279b/Products")
      .then((response)=>{
       for(let i = 0; i<response.data.length; i++){
        showProducts(response.data[i])
       }
      })
      .catch((err) =>{
       console.log(err)
      })
});

function showProducts(prod){
 const parentNode = document.getElementById('productList');
 const childHtml = `<li id = ${prod._id}> ${prod.sellingPrice}- ${prod.productName}
                     <button onclick="deleteProduct('${prod._id}')"> Delete </button> 
                     </li>`
 parentNode.innerHTML = parentNode.innerHTML+childHtml;
}

function addProduct(e){
 e.preventDefault();

 let sellingPrice = document.getElementById('sellingPrice').value;
 let productName = document.getElementById('productName').value;

 const product = {
  sellingPrice,
  productName
 }
 axios.post("https://crudcrud.com/api/9f4f2d0ea4cd4c928c6b95a77524279b/Products", product)
      .then((response)=>{
       showProducts(product)
       console.log(response)
      })
      .catch((err)=>{
       document.body.innerHTML=document.body.innerHTML+"<h4>Something went wrong</h4>"
       console.log(err)
      })
}

function deleteProduct(productId){
 axios.delete(`https://crudcrud.com/api/9f4f2d0ea4cd4c928c6b95a77524279b/Products/${productId}`)
 .then((response) => {
  console.log('user deleted')
  removeProduct(productId)
 })
 .catch((err)=>{
  console.log(err)
 })

}

function removeProduct(productId){
 const parentNode = document.getElementById('productList');
 const childNodeTobeDeleted = document.getElementById(productId);

 parentNode.removeChild(childNodeTobeDeleted);
}
