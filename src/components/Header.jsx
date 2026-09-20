const Header=({name,changeName})=>{
  return (
    <div>
      <h1>{name}</h1>
      <button onClick={changeName}>Name Change</button>
    </div>
  )
  

}
export default Header;