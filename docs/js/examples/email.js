// Generated by CoffeeScript 1.4.0
(function() {
  var bootstrap, docs, models;

  docs = window.BC.namespace("docs");

  docs.examples = window.BC.namespace("docs.examples");

  bootstrap = window.BC.namespace("bootstrap");

  models = window.BC.namespace("models");

  $.extend(this, bootstrap, models, docs);

  docs.examples.email = function() {
    return section(h1("Email"), docs.code.email(), example("Email client", "", function() {
      var currentUser, data, emailList, emails, leftPanel, rightContent, rightPanel, selectedEmail, selectedFolder, sendEmail;
      currentUser = "kiril.minkov@gmail.com";
      data = object(docs.examples.emailData());
      emails = collection(data.mail);
      selectedFolder = model();
      selectedEmail = model();
      emailList = function() {
        return table().foreach(emails, function(email) {
          return tr(td().span2(email.important ? type.label().important('important') : void 0), td().span3(strong(email.from)), td().span7(strong(email.subject))).on('click', function() {
            return selectedEmail(email);
          }).bindClass(selectedEmail, 'info', function() {
            return selectedEmail() === email;
          });
        });
      };
      rightContent = model(emailList());
      sendEmail = function(baseEmail) {
        return form.horizontal({
          From: currentUser,
          To: input.text(baseEmail.from),
          Subject: input.text(baseEmail.subject),
          Email: textarea(baseEmail.message)
        });
      };
      leftPanel = function() {
        return div().span2(button("New", function() {
          return rightContent(sendEmail(object({
            to: "",
            subject: "",
            message: ""
          })));
        }), ul().foreach(data.folders, function(folder) {
          return li(folder).on('click', function() {
            selectedFolder(folder);
            return emails.filter(function(email) {
              return _.contains(emails.folders, folder);
            });
          }).bindClass(selectedFolder, 'selected', function() {
            return selectedFolder() === folder;
          });
        }));
      };
      rightPanel = function() {
        return div().span10(button.group(button(icon.trash, "Delete", function() {
          selectedEmail().folders.length = 0;
          return selectedEmail().folders.push('trash');
        }).bindDisabled(negate(selectedEmail)), button(icon.forward, "Forward", function() {
          return rightContent(sendEmail(object({
            subject: "FW: " + selectedEmail.subject
          })));
        }).bindDisabled(negate(selectedEmail)), button(icon.pencil, "Reply", function() {
          return rightContent(sendEmail(object({
            to: selectedEmail().from,
            subject: "RE: " + selectedEmail.subject
          })));
        }).bindDisabled(negate(selectedEmail))), div(rightContent));
      };
      return body(div.container.fluid(div.row.fluid(leftPanel(), rightPanel())));
    }));
  };

}).call(this);
