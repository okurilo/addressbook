import type { ReactNode } from 'react';
import styled from 'styled-components';

export type ModalSize = 'm' | 'l';
export type ModalType = 'default' | 'fullscreen' | 'alert';

export interface ModalProps {
  title: string;
  onClose: () => void;
  type?: ModalType;
  defaultModalSize?: ModalSize;
  description?: string;
  isClosableOverlay?: boolean;
  isTransparentOverlay?: boolean;
  isCloseByEsc?: boolean;
  wrapClassName?: string;
  header?: ReactNode;
  hasDividers?: boolean;
  dataTestId?: string;
}

const Overlay = styled.div(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: theme.zIndices.modal,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
  background: 'rgba(0, 0, 0, 0.44)',
}));

const Dialog = styled.div<{ $size: ModalSize }>(({ theme, $size }) => ({
  position: 'relative',
  width: $size === 'm' ? 560 : 760,
  maxWidth: '100%',
  maxHeight: 'calc(100vh - 48px)',
  overflow: 'auto',
  padding: 24,
  borderRadius: theme.radii.lg,
  background: theme.tokens.current.core.background.default,
  color: theme.tokens.current.core.text.primary,
}));

const CloseButton = styled.button(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  width: 32,
  height: 32,
  border: 0,
  borderRadius: theme.radii.pill,
  background: theme.tokens.current.core.layer['02'],
  color: theme.tokens.current.core.icon.primary,
  cursor: 'pointer',
}));

export const Modal = (props: ModalProps): JSX.Element => {
  const { onClose, defaultModalSize = 'l', dataTestId, header, title } = props;

  return (
    <Overlay data-testid={dataTestId} role="presentation">
      <Dialog $size={defaultModalSize} aria-label={props.title} role="dialog">
        <CloseButton aria-label="Закрыть" onClick={onClose} type="button">
          ×
        </CloseButton>
        {header ?? title}
      </Dialog>
    </Overlay>
  );
};
