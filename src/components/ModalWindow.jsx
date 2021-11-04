import React from 'react'


const ModalWindow = ({
  active,
  children,
  title,
  addToPortfolioItems,
  checkPortfolio,
  setActive
}) => {

  return (
    <div className={active ? "modal_window active" : "modal_window"} onClick={() => setActive(false)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setActive(false)}
            >
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setActive(false)}
            >
              Close
            </button>
            {!checkPortfolio &&
              <button
                type="button"
                className="btn btn-primary"
                onClick={addToPortfolioItems}
              >
                Add to Portfolio
              </button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow
