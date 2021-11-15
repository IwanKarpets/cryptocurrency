import React from 'react'
import './ModalWindow.scss'

const ModalWindow = ({
  active,
  children,
  title,
  addToPortfolioItems,
  checkPortfolio,
  setActive
}) => {

  return (
    <div className={active ? "modal__window  modal__window--active" : "modal__window"} onClick={() => setActive(false)}>
      <div
        className="modal__inner"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__top">
          <div className="modal__title">{title}</div>
        </div>
        <div className="modal__content">
          {children}
        </div>
        <div className="modal__bottom">
          <button
            type="button"
            className="modal__button"
            onClick={() => setActive(false)}
          >
            Close
          </button>
          {!checkPortfolio && <button
            type="button"
            className="modal__button"
            onClick={addToPortfolioItems}
          >
            Add to Portfolio
          </button>}
        </div>
      </div>
    </div>
  );
}

export default ModalWindow
