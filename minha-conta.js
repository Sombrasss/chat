  function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index1.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}
    let uidGlobal = null;

    function abrirEdicao() {
      document.getElementById('editSection').style.display = 'block';
    }

    function salvarInfo() {
      const user = firebase.auth().currentUser;
      if (!user) return;

      const dados = {
        nomeCompleto: document.getElementById('nomeCompleto').value,
        idade: document.getElementById('idade').value,
        pais: document.getElementById('pais').value,
        status: document.getElementById('status').value
      };

      db.collection("usuarios").doc(user.uid).set(dados, { merge: true })
        .then(() => {
          document.getElementById("nomeTexto").textContent = dados.nomeCompleto;
          document.getElementById("idadeTexto").textContent = dados.idade;
          document.getElementById("paisTexto").textContent = dados.pais;
          document.getElementById("statusTexto").textContent = dados.status;
          document.getElementById('editSection').style.display = 'none';
          alert("Informações salvas com sucesso!");
        })
        .catch((error) => alert("Erro ao salvar: " + error));
    }

    function atualizarSaldo() {
      db.collection("saldos").doc(uidGlobal).get().then(doc => {
        const saldo = doc.exists ? (doc.data().valor || 0) : 0;
        document.getElementById("saldo").textContent = saldo;
      });
    }

    function registrarMovimento(tipo, valor) {
      db.collection("movimentos").add({
        uid: uidGlobal,
        tipo: tipo,
        valor: valor,
        data: firebase.firestore.Timestamp.now()
      });
    }

    function ganharMoedas(qtd) {
      const ref = db.collection("saldos").doc(uidGlobal);
      db.runTransaction(t => {
        return t.get(ref).then(doc => {
          const atual = doc.exists ? doc.data().valor : 0;
          t.set(ref, { valor: atual + qtd });
          registrarMovimento("ganhou", qtd);
        });
      }).then(() => atualizarSaldo());
    }

    function gastarMoedas(qtd) {
      const ref = db.collection("saldos").doc(uidGlobal);
      db.runTransaction(t => {
        return t.get(ref).then(doc => {
          const atual = doc.exists ? doc.data().valor : 0;
          if (atual < qtd) throw "Saldo insuficiente";
          t.set(ref, { valor: atual - qtd });
          registrarMovimento("gastou", qtd);
        });
      }).then(() => atualizarSaldo())
        .catch(err => alert("Erro: " + err));
    }

    function carregarHistorico() {
      const container = document.getElementById("historico");
      db.collection("movimentos")
        .where("uid", "==", uidGlobal)
        .orderBy("data", "desc")
        .limit(10)
        .get()
        .then(snapshot => {
          let html = "";
          snapshot.forEach(doc => {
            const m = doc.data();
            const dataStr = m.data.toDate().toLocaleString("pt-PT");
            html += `<p><strong>${m.tipo.toUpperCase()}</strong>: ${m.valor} moedas<br><small>${dataStr}</small></p><hr style="border-color:#333;">`;
          });
          container.innerHTML = html || "<p>Nenhum registro.</p>";
        });
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = "index1.html";
        return;
      }
      uidGlobal = user.uid;
      document.getElementById("userEmail").textContent = user.email;
      if (user.photoURL) {
        const photo = document.getElementById("userPhoto");
        photo.src = user.photoURL;
        photo.style.display = "block";
      }

      db.collection("usuarios").doc(user.uid).get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          document.getElementById("nomeTexto").textContent = data.nomeCompleto || "Não informado";
          document.getElementById("idadeTexto").textContent = data.idade || "Não informado";
          document.getElementById("paisTexto").textContent = data.pais || "Não informado";
          document.getElementById("statusTexto").textContent = data.status || "Não informado";

          document.getElementById("nomeCompleto").value = data.nomeCompleto || "";
          document.getElementById("idade").value = data.idade || "";
          document.getElementById("pais").value = data.pais || "";
          document.getElementById("status").value = data.status || "";
        }
      });

      atualizarSaldo();
      carregarHistorico();
    });
  