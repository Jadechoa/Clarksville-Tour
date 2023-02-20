import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const NewReviewForm = () => {
    const [userChoices, setUserChoices] = useState({
        businessId: 0,
        image: "",
        review: ""
    })
    const [businesses, setBusinesses] = useState([])
    
    
    const navigate = useNavigate()

    const localSiteUser = localStorage.getItem("site_user")
    const userObject = JSON.parse(localSiteUser)


      useEffect(() => {
        fetch("http://localhost:8088/businesses")
          .then((res) => res.json())
          .then((businessesArray) => {
            setBusinesses(businessesArray);
          });
      }, []);
    
      const handleSaveReview= (event) => {
        event.preventDefault();

        const reviewToSendToAPI = {
            userId: userObject.id,
            image: userChoices.image,
            review: userChoices.review,
        
          };

        if (
            userChoices.businessId &&
            userChoices.image && 
            userChoices.review
    ) {
        fetch('http://localhost:8088/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewToSendToAPI),
        }).then(() => {
          fetch(`http://localhost:8088/reviews`).then(() => {
            navigate('/newreview')
          })
        })
      } else {
        alert('Please Complete Form.')
      }
    }

    return (
        <form className="review-form">
          <h2 className="review-form-title">Add a new Review</h2>
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
              <div>Business: </div>
              {businesses.map((businessObj) => {
                return (
                  <div key={businessObj.id} className="radio">
                    <label>
                      <input
                        type="radio"
                        value={businessObj.id}
                        checked={userChoices.businessId === businessObj.id}
                        onChange={(event) => {
                          const copy = { ...userChoices }
                          copy.businessId = parseInt(event.target.value)
                          setUserChoices(copy)
                        }}
                      />
                      {businessObj.name}
                    </label>
                  </div>
                )
              })}
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
              copy.review= event.target.value
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
       


