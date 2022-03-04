import ReactJoyride, { STATUS } from 'react-joyride';
import { Card, Button } from 'antd';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import style from './style.module.scss';

function FunctionTooltip({
  tooltipProps, step, index, backProps, primaryProps, closeProps, isLastStep, skipProps,
}) {
  return (
    <Card className={style.card} {...tooltipProps}>
      <div className={style.header}>
        <CloseOutlined {...closeProps} />
      </div>
      <div className={style.content}>{step.content}</div>
      <div className={style.tooltip}>
        <Button type="text" size="small" style={{ color: '#AAA' }} {...skipProps}>Skip</Button>
        <div>
          {index > 0 && (
          <Button
            style={{ marginRight: 4 }}
            size="small"
            shape="round"
            type="primary"
            ghost
            {...backProps}
          >
            Back
          </Button>
          )}
          { isLastStep
            ? <Button size="small" shape="round" type="primary" {...closeProps}>Close</Button>
            : <Button size="small" shape="round" type="primary" {...primaryProps}>Next</Button>}
        </div>
      </div>
    </Card>
  );
}

function Tutorial({ steps }) {
  const [run, setRun] = useState();
  const cancelTut = (tutData) => {
    const { status, action } = tutData;
    if ([STATUS.FINISHED].includes(status) || action === 'close') {
      setRun(false);
    }
  };
  return (
    <ReactJoyride
      tooltipComponent={FunctionTooltip}
      continuous="true"
      run={run}
      callback={cancelTut}
      steps={steps}
      showProgress="true"
    />

  );
}
export default Tutorial;
