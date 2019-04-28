import Dropdown from '\node-modules\react-bootstrap\Dropdown';
import DropdownButton from '\node-modules\react-bootstrap\DropdownButton';
'use strict';

class ClassButton extends React.Component {

  render() {

    return (
        <DropdownButton variant="dark" id="classDropdown" title="Class">
            <Dropdown.Item href="#">Archon</Dropdown.Item>
            <Dropdown.Item href="#">Elementalist</Dropdown.Item>
            <Dropdown.Item href="#">Purifier</Dropdown.Item>
        </DropdownButton>
    );
  }
}

const domContainer = document.querySelector('#classFilterButton');
ReactDOM.render(ClassButton, domContainer);
