import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App(){
  const [add,setadd]=useState(false)
  const [friendid,setfriendid]=useState(null)

function hidding(){
  return setadd((add)=>!add)
}
const [items,setitems]=useState(initialFriends)
function addingupinarray(item){
 setitems([...items,item])
setadd(false)

}

function addingmain(friend){
  setfriendid((cur)=>(cur?.id===friend.id ? null: friend ))
  setadd(false)
}

function handelsplit(value){
  setitems(items.map((el)=>el.id===friendid.id?{...el,balance:value+el.balance}:el))
  setfriendid(null)
}
  return <div className="app">
    <div className="sidebar">
      <Friends items={items} addingmain={addingmain} friendid={friendid}/>
      {<Formaddfriends add={add} addingupinarray={addingupinarray} />}
      <Button onselect={hidding}>{!add ? "Add Friends":"Close"}</Button>

    </div>
    {friendid && <Splitbill friendid={friendid} handelsplit={handelsplit}/>}
  </div>
}





function Friends({items,addingmain,friendid}){
return <ul>{items.map((el)=><li><Friend friend={el} key={el.id} addingmain={addingmain} friendid={friendid}/></li>)}</ul>
}





function Friend({friend ,addingmain,friendid}){
 const isfriend=friendid?.id===friend.id
  return <li className={isfriend ? 'selected':''} >
    <img src={friend.image} alt={`{${friend.name}}`}/>
    <h3>{friend.name}</h3>
    {friend.balance<0 && ( <p className="red">You owes {friend.name} {Math.abs(friend.balance)}</p>)}
    {friend.balance===0 && <p>You and {friend.name} are even </p>}
    {friend.balance>0 && <p className="green">{friend.name} owes you {Math.abs(friend.balance)}</p>}
    <Button onselect={()=>addingmain(friend)}>{isfriend===false?"Select":"Cancel"}</Button>
  </li>
}




function Button({children,onselect}){
  return     <button className="button" onClick={onselect}>{children}</button>

}





function Formaddfriends({add ,addingupinarray}){
const [name,setname]=useState()
const [image,setimage]=useState(`https://i.pravatar.cc/48`)
const id=crypto.randomUUID()
function handelsubmit(e){
e.preventDefault()
if(!name || !image) return 
const friend={
id,
image: `${image}?=${id}`,
name,
balance:0
}
console.log(friend)
addingupinarray(friend)
setname("")
setimage('https://i.pravatar.cc/48')

}
return(add && <form className="form-add-friend" onSubmit={handelsubmit}>
  <lable> 🧑‍🤝‍🧑Friend name</lable>
  <input type="text" value={name} onChange={(e)=>setname(e.target.value)}/>

  <lable>👿image URL</lable>
  <input type="text" value={image} onChange={(e)=>setimage(e.target.value)}/>
<Button>Add</Button>
  </form>)

}








function Splitbill({friendid,handelsplit}){
const [value,setvalue]=useState('')
const [expense,setexpense]=useState('')
const [whoispaying,sewhoispaying]=useState("user")
const payingitem= value? value-expense:""
function handelsumit(e){
e.preventDefault()
if(!value ||!expense) return 
handelsplit(whoispaying==='user' ? payingitem : -expense)
}


  return <form className="form-split-bill" onSubmit={handelsumit}>
    <h2>Split bill with {friendid.name}</h2>
<label>💰Bill value</label>
<input type= "text" value={value} onChange={(e)=>setvalue(+e.target.value)}/>
<label>🚶‍♂️Your expense</label>
<input type= "text" value={expense} onChange={(e)=>setexpense(+e.target.value >value ?expense:+e.target.value)}/>

<label>🧑‍🤝‍🧑{friendid.name} expense</label>
<input type="text" disabled value={payingitem}/>

<label>🤑Who is paying the bill?</label>
<select value={whoispaying} onChange={(e)=>sewhoispaying(e.target.value)}>
  <option value="user">You</option>
  <option value="friend">{friendid.name}</option>

</select>
<Button>Split bill</Button>
  </form>
}