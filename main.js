import algoliasearch from "algoliasearch";

const client = algoliasearch("ROMP6QT8OL", "81ba8ee20b30240fc755858bcd6d3ce0");
const index = client.initIndex("search");



let data=[];
let resultsRootElement=document.querySelector('.results');
fetch('https://fakestoreapi.com/products').then(res=>res.json()).then(json=>{
    data=json; 
    // console.log(data)
});
document.querySelector('#searchInput').addEventListener('keyup',()=>{
    let searchTerm=document.querySelector('#searchInput').value;
    let resultsArray=[];
    if(String(searchTerm).trim().length > 0){
        index.search(searchTerm).then(({hits}) => {
            renderProducts(hits);
        })
        .catch(err => {console.log(err);});
        renderProducts(resultsArray);
    }else{removeElements()}
})
function renderProducts(products){
    removeElements()
    products.forEach(product=>{
        renderSingleProduct(product);
    })
}
function renderSingleProduct(product){
    let resultDiv=document.createElement('div');
    let resultImage=document.createElement('img');
    let resultTitle=document.createElement('h4');
    let resultPrice=document.createElement('p');
    let purchaseButton=document.createElement('button');
    resultImage.src=product.image;
    resultTitle.innerText=product.title;
    resultPrice.innerText=product.price;
    purchaseButton.innerText='Purchase';
    resultDiv.appendChild(resultImage);
    resultDiv.appendChild(resultTitle);
    resultDiv.appendChild(resultPrice);
    resultDiv.appendChild(purchaseButton);
    resultDiv.className = 'result';
    resultsRootElement.appendChild(resultDiv);

}
function removeElements(){
    document.querySelectorAll('.result').forEach(prod=>{
      prod.remove()
    })
  }