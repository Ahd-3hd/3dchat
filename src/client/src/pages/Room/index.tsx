import { Wrapper, UrlInput, Form, CopyButton, InputContainer, FormParagraph, Span } from './index.style';
import { FormEvent, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import World from '../../World';

const Room = (props: any) => {
  const userVideo = useRef<any>();
  const partnerVideo = useRef<any>();
  const peerRef = useRef<any>();
  const socketRef = useRef<any>();
  const otherUser = useRef<any>();
  const userStream = useRef<any>();
  const [buttonLabel, setButtonLabel] = useState('Copy');
  const [showForm, setShowForm] = useState(false);
  const urlRef = useRef<any>();
  const copyUrl = (e: FormEvent) => {
    e.preventDefault();
    urlRef.current.select();
    urlRef.current.setSelectionRange(0, 99999);
    document.execCommand('copy');
    setButtonLabel('Copied!');
    setTimeout(() => setShowForm(false), 3000);
    // alert('Copied the text: ' + urlRef.current.value);
  };
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
      userVideo.current.srcObject = stream;
      userStream.current = stream;

      socketRef.current = io.connect('/');
      socketRef.current.emit('join room', window.location.href.split('room/')[1]);
      socketRef.current.on('other user', (userID: any) => {
        callUser(userID);
        otherUser.current = userID;
      });

      socketRef.current.on('user joined', (userID: any) => {
        otherUser.current = userID;
      });

      socketRef.current.on('offer', handleRecieveCall);

      socketRef.current.on('answer', handleAnswer);

      socketRef.current.on('ice-candidate', handleNewICECandidateMsg);
    });
  }, []);

  function callUser(userID: any) {
    peerRef.current = createPeer(userID);
    userStream.current.getTracks().forEach((track: any) => peerRef.current.addTrack(track, userStream.current));
  }

  function createPeer(userID?: any) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org'
        },
        {
          urls: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com'
        }
      ]
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID: any) {
    peerRef.current
      .createOffer()
      .then((offer: any) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription
        };
        socketRef.current.emit('offer', payload);
      })
      .catch((e: any) => console.log(e));
  }

  function handleRecieveCall(incoming: any) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current.getTracks().forEach((track: any) => peerRef.current.addTrack(track, userStream.current));
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer: any) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription
        };
        socketRef.current.emit('answer', payload);
      });
  }

  function handleAnswer(message: any) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e: any) => console.log(e));
  }

  function handleICECandidateEvent(e: any) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate
      };
      socketRef.current.emit('ice-candidate', payload);
    }
  }

  function handleNewICECandidateMsg(incoming: any) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e: any) => console.log(e));
  }

  function handleTrackEvent(e: any) {
    partnerVideo.current.srcObject = e.streams[0];
  }
  return (
    <Wrapper>
      {showForm && (
        <Form onSubmit={copyUrl} spellCheck={false}>
          <FormParagraph>
            Give this to your friend, or if you're like me, open it on another tab/device <Span>*cries in lonely*</Span>
          </FormParagraph>
          <InputContainer>
            <UrlInput ref={urlRef} defaultValue={window.location.href} />
            <CopyButton type="submit">{buttonLabel}</CopyButton>
          </InputContainer>
        </Form>
      )}
      <video autoPlay ref={userVideo} muted style={{ display: 'none' }} />
      <video autoPlay ref={partnerVideo} style={{ display: 'none' }} />
      <World myVid={userVideo} otherVideo={partnerVideo} />
    </Wrapper>
  );
};

export default Room;
