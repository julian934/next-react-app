import { useState } from "react";
import { sanityClient,urlFor,usePreviewSubscription,PortableText } from "../../lib/sanity";
import recipe from "../../sanityproject1/schemas/recipe";
import {useRouter} from "next/router"


const recipeQuery=`*[_type=="recipe" && slug.current==$slug][0]{
    _id,
    name,
    slug,
    mainImage{
        asset->{
            _id,
            url
        }
    },
    ingredient[]{
        unit,
        wholeNumber,
        fraction,
        ingredient->{
            name
        }
    },
    instructions,
    likes
}`

export default function OneRecipe({data,preview}){
   
   const {data:recipe}=usePreviewSubscription(recipeQuery,{
    params:{slug:data.recipe?.slug.current},
    initialData:data,
    enabled:preview
   })

   
   const [likes,setLikes]=useState(data?.recipe?.likes)
   if(!data) return <div>Loading...</div>;
   const addLikes=async()=>{
    const res=await fetch("/api/handle-like",{
        method:"POST",
        body:JSON.stringify({_id:recipe._id})
    }).catch((error)=>console.log(error))
    const data=await res.json()
    setLikes(data.likes)
   }
   return(<article>
    <h1>{recipe.name}</h1>
    <div>
        <ul>
            {recipe.ingredient?.map((ingredient)=>(
                <li key={ingredient._key} >
                    {ingredient?.wholeNumber}
                    {ingredient?.fraction}{ingredient?.unit}
                    <br/>
                    {ingredient?.ingredient?.name}
                </li>
            ))}
        </ul>
    </div>

   </article>)
   
    
}


export async function getStaticPaths(){
    const paths=await sanityClient.fetch(
        '*[_type=="recipe" && defined(slug.current)]{"params":{"slug":slug.current}}'
    )
    return{
        paths,
        fallback:true
    }
}

export async function getStaticProps({props}){
    const {slug}=params;
    const recipe=await sanityClient.fetch(recipeQuery,{slug});
    return {props:{data:{recipe}}}

}