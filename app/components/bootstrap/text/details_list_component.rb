# frozen_string_literal: true

module Bootstrap
  module Text
    class DetailsListComponent < ApplicationComponent
      attr_reader :title, :content

      validates :title, presence: true
      validates :content, presence: true

      def initialize(id: 'details-list', title: '', options: {})
        @id = id
        @title = title
        @options = options
        add_classes
      end
    end
  end
end
