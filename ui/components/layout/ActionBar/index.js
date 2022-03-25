import { Button, Input } from 'antd';
import React from 'react';
import styles from './style.module.scss';

function ActionBar({ children = null, actions = {} }) {
  let buttons = null;
  let search = null;
  if (actions.buttons) {
    buttons = actions.buttons.map((button) => (
      <Button type="primary" shape="round" key={button.name} onClick={button.onClick} className={styles.actionButtons}>
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
      <Input placeholder={searchBar.placeholder ? searchBar.placeholder : 'Enter search text'} value={searchBar.searchValue} onChange={handleOnChange} className="action-searchBar" />
    );
  }

  return (
    <div className={styles.container}>
      <div className="first-step">
        {buttons}
      </div>
      <div className="second-step">
        <div>{children}</div>

        <div>
          {search}
        </div>
      </div>
    </div>
  );
}

export default ActionBar;
