import styled from 'styled-components';

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;
  cursor: pointer;

  input[type='checkbox'] {
    accent-color: #888;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    border-radius: 3px;
    border: 1px solid #bbb;
    background: #f5f5f5;
    transition: border 0.2s;
  }
`;

const Button = styled.button`
  padding: 10px 0;
  font-size: 16px;
  border: 1px solid #bbb;
  border-radius: 2px;
  background: #f5f5f5;
  color: #333;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
  &:hover:not(:disabled) {
    background: #e0e0e0;
    border: 1px solid #888;
  }
  &:disabled {
    background: #f0f0f0;
    color: #aaa;
    border: 1px solid #eee;
    cursor: not-allowed;
  }
`;

type ControlsProps = {
  enabled: boolean;
  autoRefresh: boolean;
  onEnabledChange: (v: boolean) => void;
  onAutoRefreshChange: (v: boolean) => void;
  onGetCat: () => void;
};

const Controls: React.FC<ControlsProps> = ({ enabled, autoRefresh, onEnabledChange, onAutoRefreshChange, onGetCat }) => (
  <ControlsWrapper>
    <Label>
      <input type="checkbox" checked={enabled} onChange={e => onEnabledChange(e.target.checked)} />
      Enabled
    </Label>
    <Label>
      <input type="checkbox" checked={autoRefresh} onChange={e => onAutoRefreshChange(e.target.checked)} disabled={!enabled} />
      Auto-refresh every 5 second
    </Label>
    <Button onClick={onGetCat} disabled={!enabled}>Get cat</Button>
  </ControlsWrapper>
);

export default Controls;
