import { memo, useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "antd";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getLiveChatSessionByUser } from "../../redux/auth/action";
import ChatBox from "../ChatBox";
import { chatSession } from "../../interfaces";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../../styles/Chatbox.module.css";
function Index() {
  const [showChatBox, setShowChatBox] = useState(false);
  const [session, setSession] = useState<chatSession>();

  const unReadMsgs = useMemo(() => {
    const chats = session?.chats?.filter(
      (e) => e.senderId !== session?.createdBy && e.status === "SEND"
    );
    return chats || [];
  }, [session]);
  const { user } = useAppSelector((state) => state.auth);
  const toggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getLiveChatSessionByUser((data: any) => {
        setSession(data);
      })
    );
  }, [dispatch]);

  const onSessionChangeHandle = (data) => {
    setSession({
      ...session,
      ...data,
    });
  };
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const node = audioRef.current;
    if (node) {
      if (unReadMsgs?.length) {
        node.play();
      } else {
        node.pause();
      }
    }
  }, [unReadMsgs]);
  if (!user) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop={false}
        autoPlay={false}
        src="https://firebasestorage.googleapis.com/v0/b/boomaeats-d8c74.appspot.com/o/audio%2Fmixkit-positive-notification-951.wav?alt=media&token=3bd4a9a7-24fa-4159-9e5f-581c23af2225"
      />
      <div className={styles.chatBoxContainer}>
        <Badge count={unReadMsgs?.length || 0} color="#292832">
          <div className={styles.chatBoxRow}>
            <button onClick={toggleChatBox}>
              <AnimatePresence mode="wait">
                {showChatBox && (
                  <motion.div
                    className={styles.ChatBoxIcon}
                    initial={{
                      opacity: 0,
                      transform: "translate(-50%, -50%) scale(0)",
                    }}
                    animate={{
                      opacity: 1,
                      transform: "translate(-50%, -50%) scale(1)",
                    }}
                    exit={{
                      opacity: 0,

                      transform: "translate(-50%, -50%) scale(0)",
                    }}
                    transition={{
                      duration: 0.7,
                      type: "spring",
                    }}
                  >
                    <FaTimes />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {!showChatBox && (
                  <motion.div
                    className={styles.ChatBoxIcon}
                    initial={{
                      transform: "translate(-50%, -50%) scale(0)",

                      opacity: 0,
                    }}
                    animate={{
                      transform: "translate(-50%, -50%) scale(1)",

                      opacity: 1,
                    }}
                    exit={{
                      transform: "translate(-50%, -50%) scale(0)",

                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.7,

                      type: "spring",
                    }}
                  >
                    <FaEllipsisH />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <ChatBox
              show={showChatBox}
              session={session}
              onSessionChange={onSessionChangeHandle}
            />
          </div>
        </Badge>
      </div>
    </>
  );
}

export default memo(Index);
