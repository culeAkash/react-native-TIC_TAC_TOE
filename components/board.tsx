import React, { useEffect, useState } from "react";
import Icons from "./icons";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import SnackBar from "react-native-snackbar";

const initialGameState = new Array<string>(9).fill("empty", 0, 9);

const Board = () => {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>("");
  const [gameState, setGameState] = useState(
    new Array<string>(9).fill("empty", 0, 9)
  );

  const checkIsGameWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameState[a] === gameState[b] &&
        gameState[b] === gameState[c] &&
        gameState[a] !== "empty"
      ) {
        setGameWinner(`${gameState[a]} is the winner of the game`);

        return;
      }
    }
  };

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner("");
    setGameState(new Array<string>(9).fill("empty", 0, 9));
  };

  const onMove = (itemNumber: number) => {
    if (gameState[itemNumber] === "empty") {
      gameState[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return alert("This cell is already occupied");
    }

    checkIsGameWinner();

    let flag = 1;
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === "empty") {
        flag = 0;
        break;
      }
    }
    if (flag === 1) {
      return setGameWinner("It's a draw");
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}
        >
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? "X" : "O"}'s turn
          </Text>
        </View>
      )}
      {/* Game Grid */}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({ item, index }) => (
          <Pressable style={styles.card} onPress={() => onMove(index)}>
            <Icons key={index} name={item} />
          </Pressable>
        )}
      />
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? "Start new Game" : "Reload"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  playerX: {
    backgroundColor: "#38CC77",
  },
  playerO: {
    backgroundColor: "#F7CD2E",
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: "33.33%",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#333",
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: "#38CC77",

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  gameBtn: {
    alignItems: "center",

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: "#8D3DAF",
  },
  gameBtnText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});

export default Board;
