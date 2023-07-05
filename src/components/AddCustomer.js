import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Employee from './Employee';
export default function AddCustomer(props) {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button 
       className="m-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex flex-wrap justify-center items-center"
      onClick={props.toggleShow}>
        + Add Customer
      </button>

      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(e) => {
            e.preventDefault();
            setName('');
            setIndustry('');
            props.newCustomer(name,industry);
            handleClose();
          }

          }
          id="editModal" 
          className="w-full max-w-sm wrap">
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Name
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  placeholder="Google"
                  value={name}
                  onChange={(e) =>  {setName(e.target.value);}}
                />
              </div>
            </div>

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="industry"
                >
                  Industry
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="industry"
                  type="text"
                  placeholder="Computing"
                  value={industry}
                  onChange={(e) => {setIndustry(e.target.value)}}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        <button
            onClick={props.toggleShow}
            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded flex flex-wrap justify-center items-center"
            form="editModal"
          >
            Close
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex flex-wrap justify-center items-center"
            form="editModal"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
