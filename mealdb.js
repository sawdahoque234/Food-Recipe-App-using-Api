
document.getElementById('searchbtn').addEventListener('click', async function(){
    const inputField=document.getElementById('inputField')
    const result=inputField.value
    inputField.value=""

    //condtion
    if(result==''){
        alert('Please write Something!!!')
    }else{
        const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${result}`
        // fetch(url)
        // .then(res=>res.json())
        // .then(data=>displayMeal(data.meals))
        const res=await fetch(url)
        const data=await res.json()
        displayMeal(data.meals)
    }
    
})

//display all meal by searching
const displayMeal=meals=>{
    console.log(meals)
    const searchResult=document.getElementById('search-result')
    searchResult.textContent=''
    // searchResult.innerHTML='' //clear search

 meals.forEach(meal=>{
     const div=document.createElement('div')
     div.classList.add('col')
    div.innerHTML=`
            <div class="card h-100">
            <img src="${meal.strMealThumb}" height="200px" width="100px" class="card-img-top rounded-3" alt="...">
            <div class="card-body shadow-lg">
            <h5 class="card-title">${meal.strMeal}</h5>
            <span class="badge bg-success">${meal.strCategory}</span>
            <span class="badge bg-secondary">${meal.strArea}</span>
            <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
            <button class="btn btn-outline-primary" onclick="loadMealDetail(${meal.idMeal})">Details</button>
            </div>
            </div>
            `
searchResult.appendChild(div)
 })
}

//load Details by id
const loadMealDetail= async mealId=>{
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    // fetch(url)
    // .then(res=>res.json())
    // .then(data=>showDetails(data.meals[0]))
        const res=await fetch(url)
        const data=await res.json()
        showDetails(data.meals[0])
}
//show details by onclick
const showDetails=meal=>{
    const details=document.getElementById('details')
    details.textContent=''

    const detailDiv=document.createElement('div')

    detailDiv.classList.add('card')

    detailDiv.innerHTML=`
    <img src="${meal.strMealThumb}" height="220px" width="220px" class=" rounded-3" alt="...">

    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <span class="badge bg-secondary">${meal.strArea}</span>
      <span class="badge bg-success">${meal.strCategory}</span>

      <p class="card-text">${meal.strInstructions.slice(0,200)}</p>

      <a href="${meal.strYoutube}" class="btn btn-primary">See Recipe</a>
    </div>
  </div>
    `
    details.appendChild(detailDiv)
}