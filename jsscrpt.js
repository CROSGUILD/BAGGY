// Wallet Connection
document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            document.getElementById('walletStatus').textContent = `Connected: ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
            document.getElementById('connectWallet').textContent = 'WALLET CONNECTED';
            document.getElementById('connectWallet').style.backgroundColor = '#4CAF50';
        } catch (error) {
            console.error(error);
            document.getElementById('walletStatus').textContent = 'Error connecting wallet';
        }
    } else {
        document.getElementById('walletStatus').textContent = 'Metamask not detected';
    }
});

// Token Calculation
document.getElementById('bnbAmount').addEventListener('input', (e) => {
    const bnbAmount = parseFloat(e.target.value);
    if (!isNaN(bnbAmount)) {
        const tokenAmount = bnbAmount * 50000000;
        document.getElementById('tokenAmount').textContent = tokenAmount.toLocaleString();
    } else {
        document.getElementById('tokenAmount').textContent = '0';
    }
});

// Buy Function
document.getElementById('buyTokens').addEventListener('click', async () => {
    const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
    if (isNaN(bnbAmount) || bnbAmount <= 0) {
        alert('Please enter valid BNB amount');
        return;
    }
    
    if (!window.ethereum?.selectedAddress) {
        alert('Connect wallet first');
        return;
    }
    
    alert(`This would process purchase of ${bnbAmount * 50000000} CGC for ${bnbAmount} BNB`);
});

// Countdown Timer
function updateCountdown() {
    const endDate = new Date('2023-12-31T23:59:59').getTime();
    const now = new Date().getTime();
    const distance = endDate - now;
    
    if (distance < 0) {
        document.getElementById('countdown').textContent = 'PRESALE ENDED';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').textContent = `Presale ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Initialize
const web3 = new Web3(window.ethereum);
setInterval(updateCountdown, 1000);
updateCountdown()