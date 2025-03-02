export async function fetchAllproduct(){
    const res = await fetch(`https://dummyjson.com/products`)
    if(!res.ok){
        throw new Error('fsiled to get post')
    }
    return await res.json();
}

export async function fetchproduct(id){
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if(!res.ok){
        throw new Error('could not get post')
    }
    return await res.json();
}