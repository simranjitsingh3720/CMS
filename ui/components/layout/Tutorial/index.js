import ReactJoyride, { STATUS } from 'react-joyride';
import { Card, Button } from 'antd';
import { useState, useContext } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import SessionContext from '../../../context/SessionContext';
import { useRequest } from '../../../helpers/request-helper';

function FunctionTooltip({
  tooltipProps, step, index, backProps, primaryProps, closeProps, isLastStep, skipProps,
}) {
  return (
    <div {...tooltipProps}>
      <Card className={style.card}>
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
    </div>
  );
}

function Tutorial({ steps, tutorialKey }) {
  const { session, refetch } = useContext(SessionContext);
  const [run, setRun] = useState();

  const [{ data }, handlePatch] = useRequest(
    {
      method: 'PATCH',
    },
    { manual: true },
  );
  const cancelTut = (tutData) => {
    const { status, action } = tutData;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status) || action === 'close') {
      setRun(false);

      // handlePatch({
      //   url: `/user/${session.user.id}`,
      //   data: {
      //     flag: {
      //       ...session.user.flag,
      //       [tutorialKey]: false,
      //     },

      //   }
      //   ,
      // })
      //   .then(() => {
      //     refetch();
      //   });
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
      disableOverlayClose="true"
    />
  );
}
export default Tutorial;
