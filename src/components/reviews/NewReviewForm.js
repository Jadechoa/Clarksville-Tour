import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const NewReviewForm = () => {
  const localSiteUser = localStorage.getItem("site_user")
  const userObject = JSON.parse(localSiteUser)

  const navigate = useNavigate()

  const [userChoices, setUserChoices] = useState({
  
    businessName: "",
    image: "",
    review: ""
  })

  const handleSaveReview = (event) => {
    event.preventDefault();

    if (
      userChoices.businessName &&
      userChoices.image &&
      userChoices.review
    ) {
      fetch('http://localhost:8088/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userChoices),
    }).then(() => {
        fetch(`http://localhost:8088/reviews`)
            .then((res) => res.json())
   //       .then((reviewsArray) => {
    //        setReviews(reviewsArray);
    .then(() => {
      navigate("/ReviewList")
  })
     //     })
        })

    } else {
      alert('Please Complete Form.')
    }
  }


  // const [businesses, setBusinesses] = useState([])
  const [reviews, setReviews] = useState([])


  /* useEffect(() => {
    fetch('http://localhost:8088/businesses')
      .then((res) => res.json())
      .then((businessesArray) => {
        setBusinesses(businessesArray);
      })

    fetch('http://localhost:8088/reviews')
      .then((res) => res.json())
      .then((reviewsArray) => {
        setReviews(reviewsArray)
      })
  }, []) */



  /* const reviewToSendToAPI = {
    userId: userObject.id,
    businessName: userChoices.businessName,

    image: userChoices.image,
    review: userChoices.review,

  }; */

 /*  useEffect(() => {
    fetch(`http://localhost:8088/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewToSendToAPI),
    })
      .then((res) => res.json())
      .then((reviewsArray) => {
        setReviews(reviewsArray);
      });
  }, []); */

 

  return (
    <form className="review-form">
      <h2 className="review-form-title">Add a new Review</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="business-name">Business Name: </label>
          <input
            required
            id="name"
            type="text"
            className="form-control"
            placeholder="Business Name"
            value={userChoices.businessName}
            onChange={(event) => {
              const copy = { ...userChoices }
              copy.businessName = event.target.value
              setUserChoices(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="imgUrl">Image URL: </label>
          <input
            required
            id="imgUrl"
            type="text"
            className="form-control"
            placeholder="example.com"
            value={userChoices.image}
            onChange={(event) => {
              const copy = { ...userChoices }
              copy.image = event.target.value
              setUserChoices(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="review">Review: </label>
          <input
            required
            id="review"
            type="text"
            className="form-control"
            placeholder="Write your review here"
            value={userChoices.review}
            onChange={(event) => {
              const copy = { ...userChoices }
              copy.review = event.target.value
              setUserChoices(copy)
            }}
          />
        </div>
      </fieldset>
      <button
        className="btn"
        onClick={(event) => {
          handleSaveReview(event)
        }}
      >
        Add Review
      </button>
    </form>
  )

}



