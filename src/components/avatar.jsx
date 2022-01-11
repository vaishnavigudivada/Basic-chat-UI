const ProfileAvatar=({link,width=0,name=""})=>{
    return <>
    {link ? 
    <img className="image" alt="dp" src={link} width={width} height={width} style={{width:width, height: width, lineHeight: width}} /> :
    <p className="image" style={{width:width, height: width, lineHeight: width}}>
      <span style={{fontSize:`${parseInt(width)/2}px`}}>{name.charAt(0)}</span>
    </p>

    }
  </>
}
export default ProfileAvatar;