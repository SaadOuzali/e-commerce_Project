import table_1 from "./table_1.png";

const UserOrdersTemplate = () => {
  return (
    <>
      <div>
        <div>
          <div className="container" style={{ marginTop: "10%" }}>
            <div className="row">
              <div className="col-md-12 ps-4 mb-4 d-flex gap-5">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="custom-icon-size"
                  >
                    <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                  </svg>
                </div>
                <div className="d-flex flex-column justify-content-end">
                  <h1 className="fw-bold">My Orders</h1>
                  <h5 className="fw-bold">first and Last Name</h5>
                </div>
              </div>
              <div
                className="row mx-auto my-auto gap-2 mt-5 justify-content-evenly"
                style={{ width: "90%", height: "100%" }}
              >
                <div className="card col-md-4 mb-3" style={{ width: "18rem" }}>
                  <img
                    src={table_1}
                    className="card-img-top pt-5 pb-3"
                    alt="table_1"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-start">
                      <h5 className="card-title fw-bold">Title</h5>
                    </div>
                    <div className="d-flex">
                      <p className="col-8 d-flex justify-content-start">
                        hello
                      </p>
                      <p className="col-4 d-flex justify-content-end">
                        125 dhs
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="favorite-icon-size"
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      </div>
                      <button
                        className="btn btn-outline-secondary style_button_product d-flex justify-content-start fw-bold"
                        style={{ borderRadius: "10px" }}
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card col-md-4 mb-3" style={{ width: "18rem" }}>
                  <img
                    src={table_1}
                    className="card-img-top pt-5 pb-3"
                    alt="table_1"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-start">
                      <h5 className="card-title fw-bold">Title</h5>
                    </div>
                    <div className="d-flex">
                      <p className="col-8 d-flex justify-content-start">
                        hello
                      </p>
                      <p className="col-4 d-flex justify-content-end">
                        125 dhs
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="favorite-icon-size"
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      </div>
                      <button
                        className="btn btn-outline-secondary style_button_product d-flex justify-content-start fw-bold"
                        style={{ borderRadius: "10px" }}
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card col-md-4 mb-3" style={{ width: "18rem" }}>
                  <img
                    src={table_1}
                    className="card-img-top pt-5 pb-3"
                    alt="table_1"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-start">
                      <h5 className="card-title fw-bold">Title</h5>
                    </div>
                    <div className="d-flex">
                      <p className="col-8 d-flex justify-content-start">
                        hello
                      </p>
                      <p className="col-4 d-flex justify-content-end">
                        125 dhs
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="favorite-icon-size"
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      </div>
                      <button
                        className="btn btn-outline-secondary style_button_product d-flex justify-content-start fw-bold"
                        style={{ borderRadius: "10px" }}
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card col-md-4 mb-3" style={{ width: "18rem" }}>
                  <img
                    src={table_1}
                    className="card-img-top pt-5 pb-3"
                    alt="table_1"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-start">
                      <h5 className="card-title fw-bold">Title</h5>
                    </div>
                    <div className="d-flex">
                      <p className="col-8 d-flex justify-content-start">
                        hello
                      </p>
                      <p className="col-4 d-flex justify-content-end">
                        125 dhs
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="favorite-icon-size"
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      </div>
                      <button
                        className="btn btn-outline-secondary style_button_product d-flex justify-content-start fw-bold"
                        style={{ borderRadius: "10px" }}
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card col-md-4 mb-3" style={{ width: "18rem" }}>
                  <img
                    src={table_1}
                    className="card-img-top pt-5 pb-3"
                    alt="table_1"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-start">
                      <h5 className="card-title fw-bold">Title</h5>
                    </div>
                    <div className="d-flex">
                      <p className="col-8 d-flex justify-content-start">
                        hello
                      </p>
                      <p className="col-4 d-flex justify-content-end">
                        125 dhs
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="favorite-icon-size"
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      </div>
                      <button
                        className="btn btn-outline-secondary style_button_product d-flex justify-content-start fw-bold"
                        style={{ borderRadius: "10px" }}
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card col-md-4 mb-3" style={{ width: "18rem" }}>
                  <img
                    src={table_1}
                    className="card-img-top pt-5 pb-3"
                    alt="table_1"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-start">
                      <h5 className="card-title fw-bold">Title</h5>
                    </div>
                    <div className="d-flex">
                      <p className="col-8 d-flex justify-content-start">
                        hello
                      </p>
                      <p className="col-4 d-flex justify-content-end">
                        125 dhs
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="favorite-icon-size"
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      </div>
                      <button
                        className="btn btn-outline-secondary style_button_product d-flex justify-content-start fw-bold"
                        style={{ borderRadius: "10px" }}
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrdersTemplate;
