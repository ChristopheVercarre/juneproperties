# frozen_string_literal: true

module Bootstrap
  module Layouts
    class LevitatingSectionComponent < ApplicationComponent
      attr_reader :content

      validates :content, presence: true

      def initialize(id: 'levitating-section', data: {}, sticky: nil, options: {})
        @id = id
        @sticky = sticky
        @options = options
        @data = data
        add_classes
        add_data_attributes
      end

      def add_classes
        super
        @classes += ' bg-white'
        @classes += ' rounded' if @options[:rounded]
        @classes += ' shadow-lg' if @options[:shadow]
        @classes += ' position-sticky' if @sticky
      end
    end
  end
end
