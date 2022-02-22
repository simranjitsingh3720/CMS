import { Drawer } from 'antd';
import React, { useState } from 'react';

export default function NewContentDrawer({ closeContentDrawer }) {
  return (
    <Drawer title="Add a new Content" placement="right" onClose={closeContentDrawer} size="medium" visible>
      H
    </Drawer>
  );
}
