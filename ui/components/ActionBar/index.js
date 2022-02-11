import { Button, Input } from 'antd';
import React from 'react';

function ActionBar({ children = null, actions = {} }) {
  let buttons = null;
  let search = null;
  if (actions.buttons) {
    buttons = actions.buttons.map((button) => (
      <Button type="primary" shape="round" key={button.name} onClick={button.onClick}>
        {button.icon}
        {button.name}
      </Button>

    ));
  }

  if (actions.searchBar) {
    const { searchBar } = actions;
    const handleOnChange = (e) => {
      actions.searchBar.setSearchValue(e.target.value);
    };
    search = (
      <Input placeholder="Enter search text" value={searchBar.searchValue} onChange={handleOnChange} className="action-searchBar" />
    );
  }

  return (
    <div style={{
      marginTop: '10px', display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between',
    }}
    >
      <div>
        {buttons}
      </div>
      <div>{children}</div>
      <div>
        {search}
      </div>
    </div>
  );
}

export default ActionBar;
