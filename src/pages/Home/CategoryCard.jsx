import { Link } from "react-router-dom";

const CategoryCard = ({ image, title, route }) => {
    return (
      <div className="card shadow-sm mb-4 overflow-hidden">
        <img src={image} className="card-img-top scale-hover" alt={title} style={{ minHeight: "300px" , objectFit: "cover" }} />
        <div className="card-body">
          <h5 className="card-title text-capitalize text-center">{title}</h5>
          <div className="d-flex justify-content-center ">
            <Link to={`${route}`} className="btn btn-primary w-50">Explore</Link>
          </div>
        </div>
      </div>
    );
  };

export default CategoryCard;  