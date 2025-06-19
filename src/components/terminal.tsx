import { memo, useEffect, useRef } from 'react';
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from '@xterm/xterm';

import "@xterm/xterm/css/xterm.css";

const TerminalComponent = ({
  vmid,
  pg,
  updateStatus
}: {
  vmid: string,
  pg: string,
  updateStatus?: () => void
}) => {
  const terminalRef = useRef(null!);
  const socketRef = useRef<WebSocket>(null!);
  // const origin = import.meta.env.DEV ? "localhost:3000" : location.origin.split("://")[1];
  const origin = (import.meta.env.VITE_WEBSOCKET as string).split("//")[1];

  function getWebSocketProtocol(): "ws" | "wss" {
    return window.location.protocol === "https:" ? "wss" : "ws";
  }


  useEffect(() => {
    const leftPane = document.querySelector('.left-pane') as HTMLDivElement;
    const term = new Terminal({
      cursorBlink: true,
      fontFamily: "Hack Nerdfont, Source Code Pro, courier-new, courier, monospace",
      theme: { background: "black", foreground: "white" }
    });


    const fitAddon = new FitAddon();
    term.open(terminalRef.current);
    term.loadAddon(fitAddon);
    fitAddon.fit();

    const cols = term.cols;
    const rows = term.rows;

    const wsProtocol = getWebSocketProtocol();

    let socket: WebSocket;
    let interval: NodeJS.Timeout;
    function connect() {
      socket = new WebSocket(`${wsProtocol}://${origin}/${pg}/${vmid}`);
      socketRef.current = socket;

      interval = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'ping' }));
        }
      }, 4000);

      socket.onmessage = (event) => {
        try {
          const signal = JSON.parse(event.data);
          if (signal.type === "pong") return;
        } catch (error) { }
        term.write(event.data);
        updateStatus?.();
        socket.send(JSON.stringify({ type: 'resize', cols, rows }));
      };

      term.onData((data) => {
        socket.send(data);
        updateStatus?.();
      });
      term.onScroll(() => {
        updateStatus?.();
      })

      socket.onerror = () => {
        // console.error("WebSocket error:", err);
      };
      socket.onclose = () => {
        // console.warn("WebSocket closed:", event);
      };
    }

    connect();

    const resizeHandler = () => {
      fitAddon.fit();
      const cols = term.cols;
      const rows = term.rows;
      if (socket.OPEN) {
        socket.send(JSON.stringify({ type: 'resize', cols, rows }));
      }
    }

    const resizeObserver = new ResizeObserver(resizeHandler);

    window.addEventListener("resize", resizeHandler);
    resizeObserver.observe(leftPane);

    return () => {
      clearInterval(interval);
      socket.close();
      term.dispose();
      window.removeEventListener("resize", resizeHandler);
      resizeObserver.unobserve(leftPane);
    };
  }, []);

  return <div className="terminal-container" id={vmid} ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default memo(TerminalComponent);
