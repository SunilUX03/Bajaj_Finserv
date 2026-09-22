// ============ Bill Discovery Flow — logic ============
(function(){
  var ICONS = {
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"></rect><path d="M2 10h20"></path></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2.5 3 4.5 5.7 4.5 9a4.5 4.5 0 0 1-9 0c0-1.2.5-2.2 1-3 .3 1 1.1 1.6 1.1 1.6C9 6.8 12 2 12 2z"></path></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 11 14 9 22 21 10 13 10 13 2"></polygon></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"></path></svg>',
    loan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M5 21V9l7-5 7 5v12"></path><path d="M9 21v-6h6v6"></path></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
  };

  var BILLS = [
    { id:'hsbc', name:'HSBC Platinum Credit Card', category:'Credit Cards', identifier:'Card ending XXXX 7674', amount:1240, dueDate:'25 Sep', status:'pending', icon:'card' },
    { id:'icici', name:'ICICI Amazon Pay Credit Card', category:'Credit Cards', identifier:'Card ending XXXX 3312', amount:1250, dueDate:'27 Sep', status:'pending', icon:'card' },
    { id:'indane', name:'Indane Gas', category:'Utilities', identifier:'LPG ID 8827461', amount:1103, dueDate:null, status:'paid', paidDate:'18 Sep', icon:'flame' },
    { id:'electricity', name:'Electricity Board', category:'Utilities', identifier:'Consumer No. 004562189', amount:640, dueDate:'28 Sep', status:'pending', icon:'bolt' },
    { id:'maxlife', name:'Max Life Insurance', category:'Insurance', identifier:'Policy holder: Rohan Verma', amount:890, dueDate:'30 Sep', status:'pending', icon:'shield' },
    { id:'bfl_loan', name:'Bajaj Finserv Personal Loan', category:'Loans', identifier:'Loan A/C XXXX 5521', amount:850, dueDate:'05 Oct', status:'pending', icon:'loan' },
    { id:'hdfc_loan', name:'HDFC Bank Personal Loan', category:'Loans', identifier:'Loan A/C XXXX 8890', amount:730, dueDate:'07 Oct', status:'pending', icon:'loan' }
  ];
  var CATEGORY_ORDER = ['Credit Cards','Utilities','Insurance','Loans'];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var discovered = [];
  var savedBills = [];
  var currentTab = 'pending';
  var toastTimer = null;

  function $(id){ return document.getElementById(id); }
  function fmtAmt(n){ return '₹' + n.toLocaleString('en-IN'); }

  function goToScreen(n){
    document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('active'); });
    $('screen'+n).classList.add('active');
  }
  window.goToScreen = goToScreen;

  function startDiscoveryFlow(){
    goToScreen(2);
    var list = $('discoveryList');
    list.innerHTML = '';
    discovered = BILLS.map(function(b){ return Object.assign({}, b); });

    if(reduceMotion){
      discovered.forEach(function(b){
        var row = document.createElement('div');
        row.className = 'discovery-row';
        row.style.opacity = 1; row.style.transform = 'none';
        row.innerHTML = '<div class="bill-icon">'+ICONS[b.icon]+'</div><span class="name">'+b.name+'</span>';
        list.appendChild(row);
      });
      setTimeout(function(){ renderResults(); goToScreen(3); }, 600);
      return;
    }

    var i = 0;
    function addNext(){
      if(i >= discovered.length){
        setTimeout(function(){ renderResults(); goToScreen(3); }, 1000);
        return;
      }
      var b = discovered[i];
      var row = document.createElement('div');
      row.className = 'discovery-row';
      row.innerHTML = '<div class="bill-icon">'+ICONS[b.icon]+'</div><span class="name">'+b.name+'</span>';
      list.appendChild(row);
      i++;
      setTimeout(addNext, 400);
    }
    setTimeout(addNext, 500);
  }
  window.startDiscoveryFlow = startDiscoveryFlow;

  function renderResults(){
    var groupsEl = $('resultsGroups');
    groupsEl.innerHTML = '';
    var paidCount = discovered.filter(function(b){ return b.status==='paid'; }).length;
    var total = discovered.length;
    var pendingSum = discovered.filter(function(b){ return b.status==='pending'; }).reduce(function(s,b){ return s+b.amount; }, 0);
    $('resultsCount').textContent = paidCount + '/' + total + ' bills found';
    $('resultsSub').textContent = fmtAmt(pendingSum) + ' to be paid';

    if(total === 0){
      groupsEl.innerHTML = '<p class="empty-hint">All bills removed. Use "Add a bill manually" to add one back.</p>';
      return;
    }

    CATEGORY_ORDER.forEach(function(cat){
      var items = discovered.filter(function(b){ return b.category===cat; });
      if(!items.length) return;
      var group = document.createElement('div');
      group.className = 'category-group';
      var heading = document.createElement('div');
      heading.className = 'category-title';
      heading.textContent = cat;
      group.appendChild(heading);
      items.forEach(function(b){
        var row = document.createElement('div');
        row.className = 'bill-row';
        row.id = 'row-'+b.id;
        row.innerHTML =
          '<div class="bill-icon">'+ICONS[b.icon]+'</div>'+
          '<div class="info">'+
            '<div class="name">'+b.name+'</div>'+
            '<div class="meta">'+b.identifier+'</div>'+
          '</div>'+
          '<button class="trash-btn" aria-label="Remove '+b.name+'" onclick="removeBill(\''+b.id+'\')">'+ICONS.trash+'</button>';
        group.appendChild(row);
      });
      groupsEl.appendChild(group);
    });
  }

  function removeBill(id){
    var row = $('row-'+id);
    if(row) row.classList.add('removing');
    setTimeout(function(){
      discovered = discovered.filter(function(b){ return b.id!==id; });
      renderResults();
    }, reduceMotion ? 0 : 220);
  }
  window.removeBill = removeBill;

  function confirmAddAll(){
    savedBills = discovered.map(function(b){ return Object.assign({}, b); });
    goToScreen(4);
    setTimeout(function(){ renderHome(); goToScreen(5); }, 1200);
  }
  window.confirmAddAll = confirmAddAll;

  function switchTab(tab){
    currentTab = tab;
    var pendingTab = $('tabPending'), paidTab = $('tabPaid');
    pendingTab.classList.toggle('active', tab==='pending');
    paidTab.classList.toggle('active', tab==='paid');
    pendingTab.setAttribute('aria-selected', tab==='pending');
    paidTab.setAttribute('aria-selected', tab==='paid');
    renderHomeList();
  }
  window.switchTab = switchTab;

  function renderHome(){
    updateStats();
    switchTab('pending');
  }

  function updateStats(){
    var pending = savedBills.filter(function(b){ return b.status==='pending'; });
    var paid = savedBills.filter(function(b){ return b.status==='paid'; });
    $('statPending').textContent = pending.length;
    $('statPaid').textContent = paid.length;
    $('statTotal').textContent = fmtAmt(pending.reduce(function(s,b){ return s+b.amount; }, 0));
  }

  function renderHomeList(){
    var listEl = $('homeList');
    listEl.innerHTML = '';
    var items = savedBills.filter(function(b){ return currentTab==='pending' ? b.status==='pending' : b.status==='paid'; });
    if(!items.length){
      listEl.innerHTML = '<p class="empty-hint">No '+currentTab+' bills right now.</p>';
      return;
    }
    items.forEach(function(b){
      var row = document.createElement('div');
      row.className = 'home-row';
      if(b.status==='pending'){
        row.innerHTML =
          '<div class="bill-icon">'+ICONS[b.icon]+'</div>'+
          '<div class="info">'+
            '<div class="name">'+b.name+'</div>'+
            '<div class="meta">'+b.identifier+' · Due '+b.dueDate+'</div>'+
          '</div>'+
          '<button class="btn btn-pay" id="pay-'+b.id+'" onclick="payBill(\''+b.id+'\')">Pay Now · '+fmtAmt(b.amount)+'</button>';
      } else {
        row.innerHTML =
          '<div class="bill-icon">'+ICONS[b.icon]+'</div>'+
          '<div class="info">'+
            '<div class="name">'+b.name+'</div>'+
            '<div class="meta">'+b.identifier+(b.paidDate ? ' · Paid on '+b.paidDate : '')+'</div>'+
          '</div>'+
          '<span class="paid-badge">'+ICONS.check+' Paid</span>';
      }
      listEl.appendChild(row);
    });
  }

  function payBill(id){
    var btn = $('pay-'+id);
    if(!btn) return;
    btn.setAttribute('disabled','');
    btn.textContent = 'Processing…';
    setTimeout(function(){
      var bill = savedBills.filter(function(b){ return b.id===id; })[0];
      if(bill){
        bill.status = 'paid';
        bill.paidDate = 'Today';
        showToast(fmtAmt(bill.amount) + ' paid successfully');
      }
      updateStats();
      renderHomeList();
    }, reduceMotion ? 0 : 650);
  }
  window.payBill = payBill;

  function showToast(msg){
    var t = $('toast');
    clearTimeout(toastTimer);
    t.textContent = msg;
    t.classList.add('show');
    toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 1800);
  }
  window.showToast = showToast;
})();
