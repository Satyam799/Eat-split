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
  const [items,setitems]=useState(initialFriends)
  const [friend,setfriend]=useState(null)
const [form,setform]=useState(false)

function friendidentity(id){
  setfriend((friend)=>friend?.id===id.id?null: id)
} 
function handelesplit(value){
  setitems((items)=>items.map((element)=>element.id===friend.id ? {...element,balance:value+element.balance}:element))
  setfriend(null)
}



function Adding(){
  setform((form)=>!form)
}
  return <div className="app">
    <div className="sidebar">
  <Friend items={items} friend={friend} friendidentity={friendidentity}/>
  {form && <Formaddfriend setitems={setitems} Adding={Adding}/>}
  <button className="button" onClick={Adding}>{form===false? "Add Friend":"Close"}</button>
  </div>
   {friend!==null &&<Splitbill friend={friend} handelesplit={handelesplit} key={friend.id}/>}
  </div>
}

function Friend({items,friend,friendidentity}){
  return <div>
<ul>{items.map((el)=><li><Fri friend={el} person={friend} friendidentity={friendidentity}/></li>)}</ul>
  </div>
}



function Fri({friend ,person,friendidentity}){
const selected=person?.id===friend.id
console.log(selected)
  return <li className={selected ? "selected" :""}>
  <img src={friend.image} alt={`${friend.name}`}/>
  <h3>{friend.name}</h3>
{
friend.balance<0 && <p className="red">You owes {friend.name} ${Math.abs(friend.balance)}</p>
}
{
friend.balance>0 && <p className="green">{friend.name} owes you {Math.abs(friend.balance)}</p>
}
{
friend.balance===0 && <p>You and {friend.name} are even</p>
}


<Button selectitem={()=>friendidentity(friend)}>{selected? 'cancle':'select'}</Button>

</li>
}

function Button({children,selectitem}){
  return <button className="button" onClick={selectitem}>{children}</button>
}



function Formaddfriend({setitems,Adding,form}){
  
  const [name,setname]=useState('');
  const [img,setimg]=useState('https://i.pravatar.cc/48')
let id=crypto.randomUUID()
const item={
  id,
  name,
  image:img,
  balance:0
}

function handelnames(e){
  e.preventDefault()
  setitems((items)=>[...items,item])
  setname('')
  setimg('https://i.pravatar.cc/48')
  Adding()

}
  return <form className="form-add-friend" onSubmit={handelnames}>
    <label>🧑‍🤝‍🧑Friend name</label>
    < input type="text" value={name} onChange={(e)=>setname(e.target.value)}/>
    <label>👿image URL</label>
    < input type="text" value={img} onChange={(e)=>setimg(e.target.value)}/>
    <Button>Add</Button>
  </form>
}


function Splitbill({friend ,handelesplit}){
  const [bill,setbill]=useState('')
  const [friendpay,setfriend]=useState('')
const [whopay,setwhopay]=useState('user')
const amount=bill?  bill-friendpay:"" 
function handelsubmittingform(e){
e.preventDefault()
if(! bill || !friendpay) return
handelesplit(whopay==='user' ? amount:-friendpay)

 }
  
  return <form className="form-split-bill" onSubmit={handelsubmittingform}>
    <h2>Split bill with {friend.name}</h2>
<label>💰Bill value</label>
<input type="text" value={bill} onChange={(e)=>setbill(+e.target.value)}/>
<label>🚶‍♂️Your expense</label>
<input type="text" value={friendpay} onChange={(e)=>setfriend(+e.target.value<bill ? +e.target.value:'')}/>
<label>🧑‍🤝‍🧑{friend.name} expense</label>
<input type="text" disabled value={Math.abs(bill-friendpay)}/>
<label>🤑Who is paying the bill?</label>
<select value={whopay} onChange={(e)=>setwhopay(e.target.value)} >
  <option value={'user'}>You</option>
  <option value={'friend'}>{friend.name}</option>

</select>
<button className="button">Split bill</button>
  </form>
}
/*https://i.pravatar.cc/48*/