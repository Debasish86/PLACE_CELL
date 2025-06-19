
    /* The Js code for the popular courses */
function showCourses(category, el) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  el.classList.add("active");

  document.querySelectorAll(".course-card").forEach(card => {
    if (category === "all") {
      card.classList.remove("show");
      if (card.classList.contains("all")) {
        card.classList.add("show");
      }
    } else {
      card.classList.remove("show");
      if (card.classList.contains(category)) {
        card.classList.add("show");
      }
    }
  });
  document.querySelectorAll('.notes-tabs .tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.notes-tabs .tab').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});
document.addEventListener("DOMContentLoaded", function () {
  showCourses('all', document.querySelector('.tab.active'));
});
}





/*  function for the Notes Section */
 function showNotes(category, element) {
  // Remove active class from all tabs
  const allTabs = document.querySelectorAll('.notes-tabs .tab');
  allTabs.forEach(tab => tab.classList.remove('active'));

  // Add active class to the clicked tab
  element.classList.add('active');

  // Show or hide notes based on category
  const allNotes = document.querySelectorAll('.note-card');
  allNotes.forEach(note => {
    if (category === 'all' || note.classList.contains(category)) {
      note.style.display = 'block';
    } else {
      note.style.display = 'none';
    }
  });
}