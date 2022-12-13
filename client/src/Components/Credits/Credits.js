import './Credits.css'
import twitter from './twitter.png'

const Credits = () => {
  return (
    <div className='credits-bg'>
    <div>.</div>
    <div className='credits-title-container'>
        <h1 className='credits-title'>Credits</h1>
    </div>
    <div className='credits-container'>
        <h3>A warm thank you to the following</h3>
        <h4>Sprout Lands</h4>
        <h5>an asset collection package</h5>
        <p>These assets were purchased from <a className='itch' href='https://cupnooble.itch.io/sprout-lands-asset-pack'>Itch.io</a> </p>
        <h4>Sunny Side World</h4>
        <h5>an asset collection package</h5>
        <p>These assets were purchased from <a className='itch' href='https://danieldiggle.itch.io/sunnyside'>Itch.io</a> </p>
        <h4>Casual Game Music</h4>
        <h5>a music collection package</h5>
        <p>These assets were purchased from <a className='itch' href='https://alkakrab.itch.io/casual-farm-background-music'>Itch.io</a></p>
        <h6>The remainder of the assets were created by the creator of the app</h6>
        <a href='/allTasks' className='back'>Go Back</a>
    </div>
    <div className='connect'>
        <a href='https://twitter.com/Framed_Games'><img src={twitter} alt='twitter' className='twitter'></img></a>
    </div>
    </div>
  )
}

export default Credits