import { Dropdown, DropdownButton } from 'react-bootstrap';

function SelectTokenDropdown() {
  return (
    <DropdownButton variant='outline-success' title="Select token">
      <Dropdown.Item value="WETH">WETH</Dropdown.Item>
      <Dropdown.Item value="WMATIC">WMATIC</Dropdown.Item>
      <Dropdown.Item value="LINK">LINK</Dropdown.Item>
    </DropdownButton>
  );
}
export default SelectTokenDropdown;