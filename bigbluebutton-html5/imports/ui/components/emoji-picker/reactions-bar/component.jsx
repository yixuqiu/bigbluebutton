import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, defineMessages } from 'react-intl';
import { Emoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Styled from './styles';
import UserListService from '/imports/ui/components/user-list/service';

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  onEmojiSelect: PropTypes.func.isRequired,
};

const intlMessages = defineMessages({
  raiseHandLabel: {
    id: 'app.actionsBar.interactions.raiseHand',
    description: 'raise Hand Label',
  },
  notRaiseHandLabel: {
    id: 'app.actionsBar.interactions.lowHand',
    description: 'not Raise Hand Label',
  },
});

const reactions = [
  {
    id: 'smiley',
    native: '😃',
  },
  {
    id: 'neutral_face',
    native: '😐',
  },
  {
    id: 'slightly_frowning_face',
    native: '🙁',
  },
  {
    id: '+1',
    native: '👍',
  },
  {
    id: '-1',
    native: '👎',
  },
  {
    id: 'clap',
    native: '👏',
  },
];

const ReactionsPicker = (props) => {
  const {
    intl,
    onReactionSelect,
    userId,
    raiseHand,
  } = props;

  const handleRaiseHandButtonClick = () => {
    UserListService.setUserRaiseHand(userId, !raiseHand);
  };

  const RaiseHandButtonLabel = () => {
    return raiseHand
      ? intl.formatMessage(intlMessages.notRaiseHandLabel)
      : intl.formatMessage(intlMessages.raiseHandLabel);
  };

  return (
    <Styled.Wrapper>
      {reactions.map(({ id, native }) => (
        <Styled.ButtonWrapper>
          <Emoji key={id} emoji={{ id }} size={30} onClick={() => onReactionSelect(native)} />
        </Styled.ButtonWrapper>
      ))}
      <Styled.Separator />
      <Styled.RaiseHandButtonWrapper onClick={() => handleRaiseHandButtonClick()} active={raiseHand}>
        <Emoji key='hand' emoji={{ id: 'hand' }} size={30} />
        {RaiseHandButtonLabel()}
      </Styled.RaiseHandButtonWrapper>
    </Styled.Wrapper>
  );
};

ReactionsPicker.propTypes = propTypes;

export default injectIntl(ReactionsPicker);
