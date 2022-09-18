import "./EmailList.css"

export default function EmailList() {
  return (
    <div className="mail">
      <h1 className="mailTitle">
        Save time, save money!
      </h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your email" />
        <button>Subscribe</button>
      </div>
      <div className="mailCheckContainer">
        <input type="checkbox" name="" id="" />
        <span>Send me a link to get the FREE Booking.com app!</span>
      </div>
    </div>
  )
}
