import React, { useState } from 'react';
import { Card, Radio } from 'antd';

export const Quiz = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Card title="クイズの質問" style={{ width: 300 }}>
      <p>ここに質問の内容を書きます。</p>
      <Radio.Group onChange={onChange} value={value}>
        <Radio style={{ display: 'block', height: '30px', lineHeight: '30px' }} value={1}>
          選択肢1
        </Radio>
        <Radio style={{ display: 'block', height: '30px', lineHeight: '30px' }} value={2}>
          選択肢2
        </Radio>
        <Radio style={{ display: 'block', height: '30px', lineHeight: '30px' }} value={3}>
          選択肢3
        </Radio>
        <Radio style={{ display: 'block', height: '30px', lineHeight: '30px' }} value={4}>
          選択肢4
        </Radio>
      </Radio.Group>
    </Card>
  );
};
