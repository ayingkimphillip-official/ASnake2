document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        Program.Main();
    }
};

class Program {
    static Main() {
        let gameBoard = new Gameboard();
    }
}