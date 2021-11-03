import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalWindow = ({
  active,
  setActive,
  children,
  title,
  addToPortfolioItems,
  checkPortfolio
}) => {

  return (
    <>
      <Modal show={active} onHide={() => setActive(false)}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setActive(false)}>
            Close
          </Button>
          {!checkPortfolio && <Button
            onClick={addToPortfolioItems}
            variant="primary">
            Add Portfolio
          </Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow
