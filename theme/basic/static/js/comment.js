const commentSubmit = document.getElementById('comment-submit');
const comment = document.getElementById('comment');

commentSubmit.addEventListener('click', async () => {
	if (!(comment instanceof HTMLTextAreaElement)) {
		return;
	}

	if (!comment.value) {
		return;
	}

	const slug = commentSubmit.getAttribute('data-slug');

	if (!slug) {
		return;
	}

	try {
		const resp = await fetch(`/blogs/${slug}/comments/new`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `Message=${encodeURIComponent(comment.value)}&ParentId=0`,
		});

		if (resp.ok) {
			res = await resp.text();
			if (res != 'ok') {
				alert(res);
				return;
			}

			// reload page
			comment.value = '';
			location.reload();
			return;
		}

		throw new Error();
	} catch (error) {
		console.log(error);
	}
});

const commentReplies = document.querySelectorAll('[data-comment="reply"]');

commentReplies.forEach((el) => {
	const parent = el.getAttribute('data-parent');
	const replySection = document.querySelector(
		`[data-comment="reply-section"][data-parent="${parent}"]`
	);

	el.addEventListener('click', () => {
		replySection.classList.toggle('hidden');
	});
});

const commentSubmits = document.querySelectorAll('[data-comment="submit"]');

commentSubmits.forEach((el) => {
	const parent = el.getAttribute('data-parent');
	const commentChild = document.querySelector(
		`[data-comment="comment"][data-parent="${parent}"]`
	);

	el.addEventListener('click', async () => {
		if (!(commentChild instanceof HTMLTextAreaElement)) {
			return;
		}

		if (!commentChild.value) {
			return;
		}

		const slug = el.getAttribute('data-slug');

		if (!slug) {
			return;
		}

		try {
			const resp = await fetch(`/blogs/${slug}/comments/new`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `Message=${encodeURIComponent(
					commentChild.value
				)}&ParentId=${parent}`,
			});

			if (resp.ok) {
				res = await resp.text();
				if (res != 'ok') {
					alert(res);
					return;
				}

				// reload page
				commentChild.value = '';
				location.reload();
				return;
			}

			throw new Error();
		} catch (error) {
			console.log(error);
		}
	});
});
