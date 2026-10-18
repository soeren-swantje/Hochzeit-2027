document.addEventListener('DOMContentLoaded', function () {
  const parameters = new URLSearchParams(window.location.search);
  let group = parameters.get('gruppe');

  if (!['tag', 'abend'].includes(group)) {
    group = sessionStorage.getItem('hochzeitGruppe') || 'abend';
  }

  sessionStorage.setItem('hochzeitGruppe', group);

  const groupField = document.querySelector('#groupField');
  if (groupField) {
    groupField.value = group === 'abend' ? 'Nachmittag und Abend' : 'Nur Nachmittag';
  }

  if (group === 'tag') {
    document.querySelectorAll('.evening-only').forEach(function (element) {
      element.classList.add('hidden-by-group');
    });
  } else {
    document.querySelectorAll('.day-only').forEach(function (element) {
      element.classList.add('hidden-by-group');
    });
  }

  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('#nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      const isOpen = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    navigation.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const daysElement = document.querySelector('#days');
  const hoursElement = document.querySelector('#hours');
  const minutesElement = document.querySelector('#minutes');

  function updateCountdown() {
    const weddingDate = new Date('2027-07-24T14:00:00+02:00');
    const difference = Math.max(0, weddingDate.getTime() - Date.now());
    if (daysElement) daysElement.textContent = Math.floor(difference / 86400000);
    if (hoursElement) hoursElement.textContent = Math.floor(difference / 3600000) % 24;
    if (minutesElement) minutesElement.textContent = Math.floor(difference / 60000) % 60;
  }

  updateCountdown();
  window.setInterval(updateCountdown, 60000);
});
