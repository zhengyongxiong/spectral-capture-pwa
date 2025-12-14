// Mobile Initialization & Logic
jQuery(document).ready(function($) {
  
  // 1. Immediate Navigation to Settings
  setTimeout(function() {
    if (typeof stepper !== 'undefined') {
      stepper.to(2); // Jump to Step 2 (Settings)
      console.log('Jumped to Settings');
    } else {
      $('#setting-trigger').click();
    }
  }, 100);

  // 2. DOM Restructuring for Mobile
  function restructureForMobile() {
    // --- SETTINGS PAGE ---
    // Move "Begin capturing" to sticky bottom if not already there
    if ($('.sticky-bottom-settings').length === 0) {
      var $nextBtn = $('#setting-page-next');
      var $stickyContainer = $('<div class="sticky-bottom sticky-bottom-settings"></div>');
      $nextBtn.parent().append($stickyContainer);
      $stickyContainer.append($nextBtn);
      
      // Update button text/icon for mobile friendliness if needed
      $nextBtn.html('开始采集');
    }
    
    // Group controls
    if ($('.control-buttons').length === 0) {
      var $controls = $('<div class="control-buttons"></div>');
      // Find the buttons: Auto-select, Flip, Rotate
      var $btns = $('#settings .btn-default');
      $btns.each(function() {
        $(this).appendTo($controls);
      });
      
      // Insert controls after video
      $('#webcam').after($controls);
      
      // Hide the empty <p> container
      $('#settings p:has(a.btn)').hide();
    }

    // --- CAPTURE PAGE ---
    // Create Sticky Actions for Capture
    if ($('.capture-actions').length === 0) {
      var $saveBtn = $('#capture-page-next');
      var $downloadBtn = $('#download-spectrum');
      
      var $actions = $('<div class="capture-actions"></div>');
      $('#capture').append($actions);
      
      $actions.append($saveBtn);
      $actions.append($downloadBtn);
      
      $saveBtn.show();
      $downloadBtn.show();
    }
  }

  // Run restructuring
  restructureForMobile();

  // 3. Resize Handling
  function handleResize() {
    console.log('Mobile handleResize called');
    
    // Check if graph container has width before updating to prevent "Invalid dimensions" error
    var $graph = $('#graph');
    if ($graph.length && $graph.width() > 0 && typeof graph !== 'undefined' && graph.chart) {
      try {
        graph.chart.update();
        // NVD3 hack: trigger window resize to force it to re-calc
        if (typeof window.dispatchEvent === "function") {
           window.dispatchEvent(new Event('resize'));
        }
      } catch(e) {
        console.warn('Graph update skipped:', e);
      }
    }
    
    // Resize Canvases
    // Sometimes canvas internal dimensions need to match CSS dimensions
    var $preview = $('#preview');
    if ($preview.length) {
      // Logic if needed
    }
  }

  // Listen to resize
  $(window).on('resize orientationchange', function() {
    setTimeout(handleResize, 200);
  });

  // Also trigger once on load
  handleResize();
  
  // Trigger when moving to capture page
  $('body').on('click', '.sticky-bottom-settings button, #setting-page-next', function() {
    // Wait for the transition to finish
    setTimeout(handleResize, 500);
    setTimeout(handleResize, 1000);
  });

  // 4. Mobile Header Injection
  if ($('.mobile-header').length === 0 && window.innerWidth < 768) {
    $('body').prepend('<div class="mobile-header">移动端光谱数据分析</div>');
  }

  // Force unregister any existing service workers to clean up mess
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
      }
    });
  }

});
